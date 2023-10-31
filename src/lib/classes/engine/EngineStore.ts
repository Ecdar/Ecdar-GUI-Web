import{ Engine } from "./Engine";
import type { EngineType } from "./EngineTypes";
/**
 * # 
 * */
 export default class EngineStore
 {
     /**
      * Array of engines defined
      * */
     engineArray: Array<Engine>;
    
     /**
      * variable used to give unique id to engines
      * */
    engineId: number;
    get EngineId(): number{
        return this.engineId = this.engineId++; //auto inc
    }

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

     CreateEngine(name: string, address: string, portRangeStart: number, portRangeEnd: number, type: EngineType){
        this.engineArray.push(new Engine(name, address, portRangeStart, portRangeEnd, type, this.engineId));
     }
    
     DeleteEngine(id: number){
        const engineIndex: number = this.engineArray.findIndex((engine: Engine) => {
            return engine.Id === id;
        })
        //check for results
        if(engineIndex > -1){
            //Check if the default engine is being removed
            if(this.defaultEngine === this.engineArray[engineIndex])
                this.defaultEngine = undefined;
            
            this.engineArray.splice(engineIndex,1);
        }
        else{
            throw new Error("Engine Id dose not exist");
        }
     }
    
    GetEngine(id: number): Engine{
        const engine: undefined | Engine = this.engineArray.find((engine: Engine) => {
            return engine.Id === id;
        })
        if(engine !== undefined)
            return engine;
        
        else
            throw new Error("Could not find engine");
    }

    GetEngines(): Engine[]{
        return this.engineArray;
    }
    
    Serialize(): string{
        return JSON.stringify(this);
    }

    DeSerialize(json: string){
        const parsedJSON: EngineStore = JSON.parse(json) as EngineStore;
        this.engineArray = parsedJSON.engineArray;
        this.engineId = parsedJSON.engineId;
        this.defaultEngine = parsedJSON.defaultEngine;

        //run Engine constructer to validate input.
        parsedJSON.engineArray.forEach((engine) =>{
            new Engine(engine.name, engine.address, engine.portRangeStart, engine.portRangeEnd, engine.type,engine.id)
        })
        
    }

     /** Functions
      
      * GetEngine (id) Morten
      * GetDefaultEngine ()
      * Serialize ()
      * DeSerialize ()
      * LoadFromJson (<JSON>) update engineId
      * SaveToJSON () Morten
      * GetEngines ()
      * */
 }

//  constructor(
//     name: string,
//     address: string,
//     portRangeStart: number,
//     portRangeEnd: number,
//     type: EngineType,
//     id: number,  
// )
//  const engObj = {
//     name: "test",
//     address: "2",
//     portRangeStart: 5,
//     portRangeEnd: 5,
//     //type: 2,
//     id: 1,
//  }
//  const engObj = {
//     name: "test",
//     address: "115.42.150.37",
//     portRangeStart: 5,
//     portRangeEnd: 5,
//     //type: 2,
//     id: 1,
//  }
 const engObj = {
    name: "test",
    address: "115.42.150.37",
    portRangeStart: 5,
    portRangeEnd: 5,
    type: 2,
    id: 1,
 }
 console.log("Engine test");
 const obj = {
    engineArray: [engObj],
    engineId: 2,
    defaultEngine: undefined,
 }

 try{
 const store: EngineStore = new EngineStore;
 store.DeSerialize(JSON.stringify(obj));
 console.log(store);

 const storeJSON = store.Serialize();

 console.log(JSON.parse(storeJSON));

 store.DeSerialize(storeJSON);
 console.log(store);
}
catch(error){
    console.log(error)
}