import { test, expect } from '@playwright/test';

import { request } from 'http';

let objectId=null;

const baseURL = 'https://api.restful-api.dev';

const objectPath = 'objects'

const fullURLWithObjectPath = baseURL + '/' + objectPath;

let fullPathAndId:string;

// Get request test

test('Get request', async ({ request }) => {

    // Record the start time

    const startTime = Date.now();

    // Send GET request to the API endpoint

    const response = await request.get(fullURLWithObjectPath);

    // Log response details

    let responseBody = await response.json();
    console.log(responseBody);

    // Log response headers 

    let responseHeaders = await response.headers();
    console.log(responseHeaders);

    // Log response size and duration

    let responseSize = await (await response.body()).byteLength;
    console.log("Response size: " + responseSize + " bytes");

    // Log response duration

    let responseDuration = Date.now() - startTime;
    console.log("Response duration: " + responseDuration + " ms");

    // Assertions

    expect(response.status()).toBe(200);
    expect(responseBody[0].id).toBe('1');

    expect(responseHeaders['content-type']).toContain('application/json');

    expect(responseSize).toBeLessThan(4000);
    expect(responseDuration).toBeLessThan(2000);

})


// Post request test
test('Post request', async ({ request }) => {
    // Define payload for POST request
    const payload = {
        "name": "Apple MacBook Pro 16",
        "data": {
            "year": 2019,
            "price": 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
        }
    }// Send POST request to the API endpoint
    const response = await request.post(fullURLWithObjectPath, {
        data: payload
    });
    const responseBody = await response.json();
    console.log(responseBody);

    // Assertions

    expect(response.status()).toBe(200);
    expect(responseBody.name).toBe(payload.name);
    expect(responseBody.data.year).toBe(payload.data.year);
    expect(responseBody.data.price).toBe(payload.data.price);
    expect(responseBody.data["CPU model"]).toBe(payload.data["CPU model"]);
    expect(responseBody.data["Hard disk size"]).toBe(payload.data["Hard disk size"]);
    expect(responseBody.id).toBeDefined();

    objectId = responseBody.id;
    fullPathAndId = fullURLWithObjectPath + '/' + objectId;

});

// Put request test
test('Put request', async ({ request }) => {
    const payload = {
   "name": "Apple MacBook Pro 17",
   "data": {
      "year": 20190,
      "price": 2049.999,
      "CPU model": "Intel Core i90",
      "Hard disk size": "1 TB0",
      "color": "silver0"
   }
}
const response = await request.put(fullPathAndId, {
    data: payload
});
const responseBody = await response.json();
console.log(responseBody);

expect(response.status()).toBe(200);
expect(responseBody.name).toBe(payload.name);
expect(responseBody.data.year).toBe(payload.data.year);
expect(responseBody.data.price).toBe(payload.data.price);
expect(responseBody.data["CPU model"]).toBe(payload.data["CPU model"]);
expect(responseBody.data["Hard disk size"]).toBe(payload.data["Hard disk size"]);
expect(responseBody.data.color).toBe(payload.data.color);
expect(responseBody.id).toBeDefined();  
});


// Patch request test
test('Patch request', async ({ request }) => {
    const payload = {
   "name": "Apple MacBook Pro 20"
   }

const response = await request.patch(fullPathAndId, {
    data: payload
})
const responseBody = await response.json();
console.log(responseBody);

expect(response.status()).toBe(200);
expect(responseBody.name).toBe(payload.name);

});

// Delete request test
test('Delete request', async ({ request }) => {


const response = await request.delete(fullPathAndId);
 
const responseBody = await response.json();
console.log(responseBody);

expect(response.status()).toBe(200);
expect(responseBody.message).toContain("Object with");

});