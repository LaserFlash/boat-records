import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { KnownBoatsService } from "../../../core/constants/known-boats/known-boats.service";
import { WaterStateConversionHelper, WindDirectionConversionHelper, WindSpeedConversionHelper } from "../../../core/constants/menu-names/nameConversion";
import { BoatUsageService } from "./providers/boat-usage.service";

@Component({
  selector: "app-view-usage",
  templateUrl: "./view-usage.component.html",
  styleUrls: ["./view-usage.component.css"],
})
export class ViewUsageComponent implements OnInit {
  // MatPaginator Output
  pageEvent: PageEvent;
  totalNumberItems = 0;
  pageSizeOptions = [20, 50, 100, 200, 500, 1000, 10000];

  constructor(public usageService: BoatUsageService,private BOATS: KnownBoatsService) {}

  ngOnInit(){}

  getUsages(event?: PageEvent) {  
    if (event.pageSize != this.usageService.batch_size) {
      return this.usageService.updateBatch(event.pageSize);
    }
    if (event.pageIndex > event.previousPageIndex) {
      return this.usageService.forwardBatch(event.pageSize - 1);     
    } else if (event.pageIndex < event.previousPageIndex) {
      return this.usageService.backBatch(event.pageSize - 1);
    }
  }

  exportCSV() {
    const fetchData = this.usageService.currentSelectedUsages.subscribe((usage) => {
      const csvSuitableUsage = usage.map((data) => ({
        boat: this.BOATS.getBoatName(data.boatID),
        driver: data.driver,
        otherCrew: data.otherCrew
          .map(({ name }) => name)
          .filter(Boolean)
          .join(" - "),
        hours: data.duration.toPrecision(2),
        startTime: new Date(data.startTime.seconds * 1000).toLocaleString(),
        endTime: new Date(data.endTime.seconds * 1000).toLocaleString(),
        windSpeed: WindSpeedConversionHelper.windSpeedFromNumber(data.windSpeed),
        windDirection: WindDirectionConversionHelper.windDirectionFromNumber(
          data.windDirection
        ),
        waterState: WaterStateConversionHelper.waterStateFromNumber(
          data.waterState
        )
      }))

      const csvContent = "data:text/csv;charset=utf-8," + this.convertToCSV(csvSuitableUsage);
      const encodedUri = encodeURI(csvContent.toString());
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "usage.csv");
      document.body.appendChild(link); // Required for FF
      
      link.click();
    });
    
    fetchData.unsubscribe()
  }

  private convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr)
  
    return array.map(row => 
      Object.values(row).map(value => 
         typeof value === 'string' ? JSON.stringify(value) : value
      ).toString()
    ).join('\n')
  }

  trackByIdx(i) {
    return i;
  }
}
