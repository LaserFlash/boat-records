
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';

type Error = { error: { code: string } }

export default async function addDefaultValueForField(db: AngularFirestore, url: string, fieldName: string, defaultFieldValue: unknown, pageSize: number = 100) {
    let checkedCount = 0, pageCount = 1;
    const initFieldPromises: Promise<any>[] = [], newData = { [fieldName]: defaultFieldValue };

    // get first page of results
    console.info(`Fetching page ${pageCount}...`);
    let querySnapshot = await db.collection(url, (ref) => ref.limit(pageSize)).get().toPromise()


    // while page has data, parse documents
    while (!querySnapshot.empty) {
        // for fetching the next page
        let lastSnapshot: QueryDocumentSnapshot<unknown> | undefined = undefined;

        // for each document in this page, add the field as needed
        querySnapshot.forEach(doc => {
            if (doc.get(fieldName) === undefined) {
                const addFieldPromise = doc.ref.update(newData)
                    .then(
                        () => ({ success: true, ref: doc.ref }),
                        (error) => ({ success: false, ref: doc.ref, error }) // trap errors for later analysis
                    );

                initFieldPromises.push(addFieldPromise);
            }

            lastSnapshot = doc as QueryDocumentSnapshot<unknown>;
        });

        checkedCount += querySnapshot.size;
        pageCount++;

        // fetch next page of results
        console.info(`Fetching page ${pageCount}... (${checkedCount} documents checked so far, ${initFieldPromises.length} need initialization)`);
        querySnapshot = await db.collection(url, (ref) => ref.limit(pageSize).startAfter(lastSnapshot)).get().toPromise()
    }

    console.info(`Finished searching documents. Waiting for writes to complete...`);

    // wait for all writes to resolve
    const initFieldResults = await Promise.all(initFieldPromises);

    console.info(`Finished`);

    // count & sort results
    let initializedCount = 0, errored: Error[] = [];
    initFieldResults.forEach((res) => {
        if (res.success) {
            initializedCount++;
        } else {
            errored.push(res);
        }
    });

    const results = {
        attemptedCount: initFieldResults.length,
        checkedCount,
        errored,
        erroredCount: errored.length,
        initializedCount
    };

    console.info([
        `From ${results.checkedCount} documents, ${results.attemptedCount} needed the "${fieldName}" field added.`,
        results.attemptedCount == 0
            ? ""
            : ` ${results.initializedCount} were successfully updated and ${results.erroredCount} failed.`
    ].join(""));

    if (errored.length) {
        const errorCountByCode = errored.reduce(
            (counters, result) => {
                const code = result.error.code || "unknown";
                counters[code] = (counters[code] || 0) + 1;
                return counters;
            }, {});

        console.info("Errors by reported code:", errorCountByCode);
    }

    return results;
}