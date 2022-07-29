import { MarkedDateProps } from "../../components/Calendar";
import { CarDTO } from "../../DTOs/CarDTO";

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            carDetails: {
                car: CarDTO
            };
            myCars: undefined;
            scheduling: {
                car: CarDTO
            };
            schedulingDetails: {
                car: CarDTO,
                dates: string[]
            };
            schedulingComplete: undefined;
        }
    }
}