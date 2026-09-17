const chunkSize = 50
function chunkArray(arr, size) {
        let chunk = [];
        for(let i= 0; i < arr.length; i +=size){
            chunk.push(arr.slice(i , i +size))
        }

        return chunk
    }

export {chunkArray, chunkSize}