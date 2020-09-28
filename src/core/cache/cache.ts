
class Cache<T extends {id : K}, K> {

    cache = new Map<K, T>();
    storeFunction :()=>Promise<T[]> = undefined;
    refreshed : boolean = false;

    constructor(storeFunction : ()=>Promise<T[]>=()=>Promise.resolve([])) {
        this.storeFunction=storeFunction;
    }
    
    getSingleElement=async (key : K) : Promise<T>=>{
        try{
            const value = this.cache.get(key);
            if(!value) throw new Error(`No element cached with id ${key}`);
            return value;
        }catch(error)
        {
            if(!this.refreshed){
                await this.loadData();
                this.refreshed=true;
                return await this.getSingleElement(key);
            }
            return;
        }
        
    }

    getFromCache=async(keys : K | K[]) : Promise<T[]>=>{
        var value;
        if(Array.isArray(keys)){
            value= keys.map(async e=>(await this.getSingleElement(e)));
        }else {
            value = await this.getSingleElement(keys);
            return Promise.resolve(value);
        }
        return Promise.resolve(value);
    }
    
    get=async(keys : K | K[]) : Promise<T[]> =>{
        this.refreshed=false;
        return Promise.resolve(this.getFromCache(keys));
    }

    loadData=async() : Promise<void>=>{
        const data = await this.storeFunction();
        this.clear();
        data.forEach(element => {
            this.cache.set(element.id,element);
        });
    }

    delete=(key : K) : void=> {
        this.cache.delete(key);
    }

    clear=() : void =>{
        this.cache.clear();
    }
}
  
  
  export default Cache;