[![DEV Release](https://github.com/LaserFlash/qcyc-usagemaintenancetracker/actions/workflows/deploy-boat-records.yml/badge.svg)](https://github.com/LaserFlash/qcyc-usagemaintenancetracker/actions/workflows/deploy-boat-records.yml) [![QCYC Release](https://github.com/LaserFlash/qcyc-usagemaintenancetracker/actions/workflows/deploy-qcyc.yml/badge.svg)](https://github.com/LaserFlash/qcyc-usagemaintenancetracker/actions/workflows/deploy-qcyc.yml) [![WBBC Release](https://github.com/LaserFlash/qcyc-usagemaintenancetracker/actions/workflows/deploy-wbbc.yml/badge.svg)](https://github.com/LaserFlash/qcyc-usagemaintenancetracker/actions/workflows/deploy-wbbc.yml) [![NPYC Release](https://github.com/LaserFlash/qcyc-usagemaintenancetracker/actions/workflows/deploy-npyc.yml/badge.svg)](https://github.com/LaserFlash/qcyc-usagemaintenancetracker/actions/workflows/deploy-npyc.yml) [![HBC Release](https://github.com/LaserFlash/qcyc-usagemaintenancetracker/actions/workflows/deploy-hbc.yml/badge.svg)](https://github.com/LaserFlash/qcyc-usagemaintenancetracker/actions/workflows/deploy-hbc.yml)

# Boat Records and Maintenance Tracker

## Setup

This repo can build and deploy multiple versions of this site / app.  
To support this we have `environments/` where we can provide assets and config that vary for each version of the site.

## Development

To start local development run `npm run start`.  
This action performs a couple of things.

- copies `environments/dev` into application src directory
- enables config and styles that are unique to this environment
