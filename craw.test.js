
const { test, expect } = require("@jest/globals")
const { normalizeURL, getURLfromHTML } = require("./craw")
test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    console.log('Actual:', actual);
    expect(actual).toEqual(expected);
});
test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    console.log('Actual:', actual);
    expect(actual).toEqual(expected);
});
test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    console.log('Actual:', actual);
    expect(actual).toEqual(expected);
});
test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    console.log('Actual:', actual);
    expect(actual).toEqual(expected);
});
test('getURLfromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev blog
            </a>
        </body>
    </html>
`;
    const inputBaseURL="https://blog.boot.dev";
    const actual = getURLfromHTML(inputHTMLBody,inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    console.log('Actual:', actual);
    expect(actual).toEqual(expected);
});
test('getURLfromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev blog
            </a>
        </body>
    </html>
`;
    const inputBaseURL="https://blog.boot.dev";
    const actual = getURLfromHTML(inputHTMLBody,inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    console.log('Actual:', actual);
    expect(actual).toEqual(expected);
});
test('getURLfromHTML both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path1/">
                Boot.dev blog
            </a>
            <a href="https://blog.boot.dev/path2/">
                Boot.dev blog
            </a>
        </body>
    </html>
`;
    const inputBaseURL="https://blog.boot.dev";
    const actual = getURLfromHTML(inputHTMLBody,inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"];
    console.log('Actual:', actual);
    expect(actual).toEqual(expected);
});
test('getURLfromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                invalid
            </a>
            
        </body>
    </html>
`;
    const inputBaseURL="https://blog.boot.dev";
    const actual = getURLfromHTML(inputHTMLBody,inputBaseURL);
    const expected = [];
    console.log('Actual:', actual);
    expect(actual).toEqual(expected);
});



