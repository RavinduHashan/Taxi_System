// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrlAdmin: 'http://localhost:5000/admins',
  apiBaseUrlDriver:'http://localhost:5000/drivers',
  apiBaseUrlCustomer:'http://localhost:5000/customers',
  apiBaseUrlOrder:'http://localhost:5000/orders',
  apiBaseUrlVehicle:'http://localhost:5000/vehicles'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
