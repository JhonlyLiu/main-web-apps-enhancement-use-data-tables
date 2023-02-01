export class APIBaseUriIsNotSetException extends Error {

    constructor() {
      super();
  
      this.message = 'Incomplete setup: Please check if your .env';
    }
  }
  