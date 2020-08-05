// const mdLinks = require('../');

const {
    returnFileUrls, validateUrls, statsUrls, filePath,
  } = require('../index.js');
  
  describe('returnFileUrls', () => {
    it('is a function', () => {
      expect(typeof returnFileUrls).toBe('function');
    });
})

describe('validateUrls', () => {
    it('is a function', () => {
      expect(typeof validateUrls).toBe('function');
    });
})

describe('statsUrls', () => {
    it('is a function', () => {
      expect(typeof statsUrls).toBe('function');
    });
})

describe('filePath', () => {
    it('is a variable that holds a string', () => {
      expect(typeof filePath).toBe('string');
    });
})

describe('RegExr', () => {
    it('is a constant that holds a regular expression', () => {
      expect(typeof filePath).toBe('string');
    });
})


