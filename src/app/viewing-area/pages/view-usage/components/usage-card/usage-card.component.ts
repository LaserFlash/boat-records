import { Component, OnInit, Input } from '@angular/core';
import { UsageInfoID } from '../../../../../core/objects/usageInfo';
import { WindSpeedConversionHelper, WindDirectionConversionHelper, WaterStateConversionHelper } from '../../../../../core/constants/menu-names/nameConversion';
import { KnownBoatsService } from '../../../../../core/constants/known-boats/known-boats.service';
import { BoatUsageService } from '../../providers/boat-usage.service';
import { AuthenticationService } from '../../../../../core/auth/authentication.service';
import { ModalService } from '../../../../../ui/modal/modal.service';

@Component({
  selector: 'usage-card',
  templateUrl: './usage-card.component.html',
  styleUrls: ['./usage-card.component.css']
})
export class UsageCardComponent implements OnInit {

  @Input() usage: UsageInfoID;
  canDelete = false;

  constructor(private AUTH: AuthenticationService, private usageService: BoatUsageService, private dialogsService: ModalService, private BOATS: KnownBoatsService) { }

  ngOnInit() {
    this.AUTH.isAdmin.subscribe(isAdmin => this.canDelete = isAdmin);
  }

  getBoatName(v) {
    return this.BOATS.getBoatName(v);
  }

  getWindSpeed(v) {
    return WindSpeedConversionHelper.windSpeedFromNumber(v);
  }

  getWindDirection(v) {
    return WindDirectionConversionHelper.windDirectionFromNumber(v);
  }

  getSeaState(v) {
    return WaterStateConversionHelper.waterStateFromNumber(v);
  }

  shortDuration(duration) {
    return Number.parseFloat(duration).toPrecision(2).toString();
  }


  deleteUsageRecord() {
    this.usageService.deleteUsage(this.usage)
  }

  openRemovalModal() {
    this.dialogsService
      .confirm('Rmove this usage entry', 'Are you sure you want to do this? It cannot be undone', 'Remove')
      .subscribe(confirmed => {
        if (confirmed) this.deleteUsageRecord();
      });
  }
}
