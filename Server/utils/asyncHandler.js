export const asyncHandler = (fn)=> async (req, res, next)=>{
    return Promise.resolve(fn(req, res, next)).catch(error => next(error));
}