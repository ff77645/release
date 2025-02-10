

let actoken = undefined

export const getActoken = async ()=>{
  if(actoken !== undefined) return actoken
  actoken = fetch('https://proxy2.tooto.live/ac_tok').then(res=>res.text())
  return actoken
}