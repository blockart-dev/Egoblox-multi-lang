import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { getCarrier } from '../bills/utils/networkCarrierChecker.util';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class BillsService {
  constructor(private readonly httpService: HttpService) {}

  async getSupportedBills() {
    try {
      const supportedBills = await this.httpService.axiosRef.get(
        'https://api.flutterwave.com/v3/top-bill-categories',
        {
          params: {
            country: 'NG',
          },
          headers: {
            Authorization: process.env.FLUTTERWAVE_SECRET,
          },
        },
      );

      return supportedBills.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getBillCategory(billType: string) {
    try {
      const categoryInfo = await this.httpService.axiosRef.get(
        `https://api.flutterwave.com/v3/bills/${billType}/billers`,
        {
          params: {
            country: 'NG',
          },
          headers: {
            Authorization: process.env.FLUTTERWAVE_SECRET,
          },
        },
      );
      console.log(categoryInfo.data);
      return categoryInfo.data;
    } catch (error) {
      console.log(error);
    }
  }

  async buyAirtime(phoneNumber: string, amount: string) {
    try {
      const carrier = getCarrier(phoneNumber);
      const payLoad = {
        country: 'NG',
        customer_id: `${phoneNumber}`,
        amount: Number(amount),
      };
      console.log(carrier);
      switch (carrier) {
        case 'MTN NIGERIA':
          try {
            const mtnAirtime = await this.httpService.axiosRef.post(
              `https://api.flutterwave.com/v3/billers/BIL099/items/AT099/payment`,
              payLoad,
              {
                headers: {
                  Authorization: process.env.FLUTTERWAVE_SECRET,
                },
              },
            );
            console.log(mtnAirtime.data);
            return mtnAirtime.data;
          } catch (error) {
            console.log(error);
            break;
          }

        case 'GLO NIGERIA':
          try {
            const gloAirtime = await this.httpService.axiosRef.post(
              `https://api.flutterwave.com/v3/billers/BIL102/items/AT102/payment`,
              payLoad,
              {
                headers: {
                  Authorization: process.env.FLUTTERWAVE_SECRET,
                },
              },
            );
            console.log(gloAirtime.data);
            return gloAirtime.data;
          } catch (error) {
            console.log(error);
            break;
          }

        case 'AIRTEL NIGERIA':
          try {
            const airtelAirtime = await this.httpService.axiosRef.post(
              `https://api.flutterwave.com/v3/billers/BIL100/items/AT100/payment`,
              payLoad,
              {
                headers: {
                  Authorization: process.env.FLUTTERWAVE_SECRET,
                },
              },
            );
            console.log(airtelAirtime.data);
            return airtelAirtime.data;
          } catch (error) {
            console.log(error);
            break;
          }

        case '9MOBILE NIGERIA':
          try {
            const etisalatAirtime = await this.httpService.axiosRef.post(
              `https://api.flutterwave.com/v3/billers/BIL103/items/AT103/payment`,
              payLoad,
              {
                headers: {
                  Authorization: process.env.FLUTTERWAVE_SECRET,
                },
              },
            );
            console.log(etisalatAirtime.data);
            return etisalatAirtime.data;
          } catch (error) {
            console.log(error);
            break;
          }

        default:
          console.log('nothing');
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //   async payElectricity(meterNo: string, amount: string, disco: string) {
  //     try {
  //       const carrier = getCarrier(phoneNumber);
  //       const payLoad = {
  //         country: 'NG',
  //         customer_id: `${phoneNumber}`,
  //         amount: Number(amount),
  //       };
  //       console.log(carrier);
  //       switch (carrier) {
  //         case 'MTN NIGERIA':
  //           try {
  //             const mtnAirtime = await this.httpService.axiosRef.post(
  //               `https://api.flutterwave.com/v3/billers/BIL099/items/AT099/payment`,
  //               payLoad,
  //               {
  //                 headers: {
  //                   Authorization: process.env.FLUTTERWAVE_SECRET,
  //                 },
  //               },
  //             );
  //             console.log(mtnAirtime.data);
  //             return mtnAirtime.data;
  //           } catch (error) {
  //             console.log(error);
  //             break;
  //           }

  //         case 'GLO NIGERIA':
  //           try {
  //             const gloAirtime = await this.httpService.axiosRef.post(
  //               `https://api.flutterwave.com/v3/billers/BIL102/items/AT102/payment`,
  //               payLoad,
  //               {
  //                 headers: {
  //                   Authorization: process.env.FLUTTERWAVE_SECRET,
  //                 },
  //               },
  //             );
  //             console.log(gloAirtime.data);
  //             return gloAirtime.data.status;
  //           } catch (error) {
  //             console.log(error);
  //             break;
  //           }

  //         case 'AIRTEL NIGERIA':
  //           try {
  //             const airtelAirtime = await this.httpService.axiosRef.post(
  //               `https://api.flutterwave.com/v3/billers/BIL100/items/AT100/payment`,
  //               payLoad,
  //               {
  //                 headers: {
  //                   Authorization: process.env.FLUTTERWAVE_SECRET,
  //                 },
  //               },
  //             );
  //             console.log(airtelAirtime.data);
  //             return airtelAirtime.data.status;
  //           } catch (error) {
  //             console.log(error);
  //             break;
  //           }

  //         case '9MOBILE NIGERIA':
  //           try {
  //             const etisalatAirtime = await this.httpService.axiosRef.post(
  //               `https://api.flutterwave.com/v3/billers/BIL103/items/AT103/payment`,
  //               payLoad,
  //               {
  //                 headers: {
  //                   Authorization: process.env.FLUTTERWAVE_SECRET,
  //                 },
  //               },
  //             );
  //             console.log(etisalatAirtime.data);
  //             return etisalatAirtime.data.status;
  //           } catch (error) {
  //             console.log(error);
  //             break;
  //           }

  //         default:
  //           console.log('nothing');
  //           break;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}
