// A simple Promise example

const myPromise = new Promise((resolve, reject) => {

    const success = true;

    if (success) {
        resolve("Operation was successful!");
    } else {
        reject("Operation failed.");
    }

});


// Async/Await function

const myAsyncFunction = async () => {

    try {

        const result = await myPromise;

        console.log(result);

    } catch (error) {

        console.error(error);

    }

};


myAsyncFunction();