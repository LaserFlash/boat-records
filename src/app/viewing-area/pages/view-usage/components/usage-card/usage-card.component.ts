import { Component, OnInit, Input } from '@angular/core';
import { UsageInfoID } from '../../../../../core/objects/usageInfo';
import { WindSpeedConversionHelper, WindDirectionConversionHelper, WaterStateConversionHelper } from '../../../../../core/constants/menu-names/nameConversion';
import { KnownBoatsService } from '../../../../../core/constants/known-boats/known-boats.service';
import { BoatUsageService } from '../../providers/boat-usage.service';
import { AuthenticationService } from '../../../../../core/auth/authentication.service';

@Component({
  selector: 'usage-card',
  templateUrl: './usage-card.component.html',
  styleUrls: ['./usage-card.component.css']
})
export class UsageCardComponent implements OnInit {

  @Input() usage: UsageInfoID;
  canDelete = false;

  constructor(private AUTH: AuthenticationService, private usageService: BoatUsageService, private BOATS: KnownBoatsService) { }

  ngOnInit() {
    this.AUTH.isAdmin.subscribe(isAdmin => this.canDelete = isAdmin);
  }

  deleteUsageRecord() {
    this.usageService.deleteUsage(this.usage)
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
}
