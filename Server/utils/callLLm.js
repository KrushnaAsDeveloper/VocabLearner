import data from "./SampleData.json" with {type : "json"}
async function callLLM(Arraychunk) {
   console.log("LLM response", Arraychunk)
    return data;
}

export {callLLM}