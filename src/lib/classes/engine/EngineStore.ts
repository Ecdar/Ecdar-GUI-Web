import type{ Engine } from "./Engine";
/**
 * # 
 * */
 export class EngineStore
 {
     /**
      * Array of engines defined
      * */
     engineArray: Array<Engine>;
    
     /**
      * variable used to give unique id to engines
      * */
     engineId: number; // load json fix

     /**
      * Array of engines defined
      * */
     defaultEngine?: Engine;


     constructor(
     ) {
        this.engineArray = new Array<Engine>;
        this.engineId = 0;
        this.defaultEngine = undefined;
     }

     /** Functions
      * CreateEngine (id name adress portrrangestart portrangeend type)
      * DeleteEngine (id)
      * GetEngine (id)
      * GetDefaultEngine ()
      * Serialize ()
      * DeSerialize ()
      * LoadFromJson (<JSON>) update engineId
      * SaveToJSON ()
      * GetEngines ()
      * */
 }
 