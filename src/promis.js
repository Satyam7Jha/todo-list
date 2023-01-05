const fetchAnimalPromis = ()=>{
    let p = new Promise(function(resolve, reject) { 
            setTimeout(() => {
                resolve( { data: { name: "Tiger", power: 500 } });}, 5000)});
    return p
}

const fetchAnimal = async () => {
  const res = await fetchAnimalPromis();
  console.log(res);
};
console.log("programe starting..")
fetchAnimal()
console.log("Program complete!")



// --------------------------

const fetchAnimalPromis = ()=>{
  let p = new Promise(function(resolve, reject) { 
          setTimeout(() => {
                  reject( "Pointless Progress!");
                  }, 5000)});
return p
  
}

const fetchAnimal =  async() => {
  try{
      const res = await fetchAnimalPromis()
      console.log(res)
  }
  catch(err){
      console.log("using async await: ",err)
  }
}

console.log("programe starting..")
fetchAnimal()


console.log("programe ending..")


// --------------------------------------
console.log("program started")

 let p = new Promise(function(resolve, reject) { 
        console.log('Program in progress...')
        setTimeout(() => {
            resolve( "Program complete");}, 2000);
        setTimeout(() => {
            reject( "Program failure");}, 3000);
 });
 
 const fetchData = async ()=>{
     try{
         console.log(p)
         const res = await p;
         
         console.log(res)
     }
     catch(err){
         console.log(err)
     }
     
 }
 fetchData()



//  --------------------------
 console.log( "Program started")
let p = new Promise(function(resolve, reject) { 
    console.log("Program in progress...")
    setTimeout(() => {
        resolve("resolve");}, 3000)});
        
