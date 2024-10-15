class Table {
  constructor(tableNumber) {
    this.tableNumber = tableNumber;
    this.isReserved = false;
  }
}

class Queue {
  constructor() {
    this.customers = [];
  }

  isQueueFull() {
    return this.customers.length >= MAX_QUEUE_SIZE;
  }

  isQueueEmpty() {
    return this.customers.length === 0;
  }

  isCustomerInQueue(customerID) {
    return this.customers.includes(customerID);
  }

  enqueue(customerID) {
    if (this.isQueueFull()) {
      alert("Queue is full!");
      return;
    }
    if (this.isCustomerInQueue(customerID)) {
      alert(`Customer ID ${customerID} is already in the queue!`);
      return;
    }
    this.customers.push(customerID);
    alert(`Customer ID ${customerID} added to the queue.`);
  }

  enqueueWithPriority(customerID) {
    if (this.isQueueFull()) {
      alert("Queue is full!");
      return;
    }
    if (this.isCustomerInQueue(customerID)) {
      alert(`Customer ID ${customerID} is already in the queue!`);
      return;
    }
    this.customers.unshift(customerID); // Add to the front of the queue
    alert(`Customer ID ${customerID} with reservation added to the front of the queue.`);
  }

  dequeue() {
    if (this.isQueueEmpty()) {
      return -1;
    }
    return this.customers.shift();
  }
}

const MAX_4_SEAT_TABLES = 10;
const MAX_6_SEAT_TABLES = 10;
const MAX_QUEUE_SIZE = 50;

let tables4Seating = [];
let tables6Seating = [];
let queue4Seating = new Queue();
let queue6Seating = new Queue();

function initializeTables() {
  for (let i = 0; i < MAX_4_SEAT_TABLES; i++) {
    tables4Seating.push(new Table(i + 1));
  }
  for (let i = 0; i < MAX_6_SEAT_TABLES; i++) {
    tables6Seating.push(new Table(i + 1));
  }
}

function searchTables(seats) {
  let found = false;
  if (seats === 4) {
    tables4Seating.forEach(table => {
      if (!table.isReserved) {
        alert(`Table ${table.tableNumber} (4 seats) is available.`);
        found = true;
      }
    });
  } else if (seats === 6) {
    tables6Seating.forEach(table => {
      if (!table.isReserved) {
        alert(`Table ${table.tableNumber} (6 seats) is available.`);
        found = true;
      }
    });
  }
  if (!found) {
    alert(`No available tables with ${seats} seats.`);
  }
}

function bookTable(seats) {
  let queue = (seats === 4) ? queue4Seating : queue6Seating;
  let customerID = queue.dequeue();
  if (customerID === -1) {
    alert(`No customers in the queue for ${seats}-seat tables.`);
    return;
  }

  let found = false;
  if (seats === 4) {
    for (let table of tables4Seating) {
      if (!table.isReserved) {
        table.isReserved = true;
        alert(`Customer ${customerID} booked Table ${table.tableNumber} with 4 seats.`);
        found = true;
        break;
      }
    }
  } else if (seats === 6) {
    for (let table of tables6Seating) {
      if (!table.isReserved) {
        table.isReserved = true;
        alert(`Customer ${customerID} booked Table ${table.tableNumber} with 6 seats.`);
        found = true;
        break;
      }
    }
  }
  if (!found) {
    alert(`No available tables to book for customer ${customerID} with ${seats} seats.`);
  }
}

function freeTable(tableNumber, seats) {
  let found = false;
  if (seats === 4) {
    if (tableNumber > 0 && tableNumber <= MAX_4_SEAT_TABLES) {
      if (tables4Seating[tableNumber - 1].isReserved) {
        tables4Seating[tableNumber - 1].isReserved = false;
        alert(`Table ${tableNumber} with 4 seats has been freed.`);
        found = true;
        bookTable(4);
      }
    }
  } else if (seats === 6) {
    if (tableNumber > 0 && tableNumber <= MAX_6_SEAT_TABLES) {
      if (tables6Seating[tableNumber - 1].isReserved) {
        tables6Seating[tableNumber - 1].isReserved = false;
        alert(`Table ${tableNumber} with 6 seats has been freed.`);
        found = true;
        bookTable(6);
      }
    }
  }

  if (!found) {
    alert(`Table ${tableNumber} with ${seats} seats is either not reserved or does not exist.`);
  }
}

function main() {
  initializeTables();

  while (true) {
    let choice = parseInt(prompt(`
      Restaurant Tables Management System
      1. Search Tables
      2. Add Customer to Queue (4-seating)
      3. Add Customer to Queue (6-seating)
      4. Add Reserved Customer to Queue (4-seating)
      5. Add Reserved Customer to Queue (6-seating)
      6. Book Next Table (4-seating)
      7. Book Next Table (6-seating)
      8. Free Table
      9. Exit
      Enter your choice: `));

    switch (choice) {
      case 1:
        let seats = parseInt(prompt("Enter number of seats to search (4 or 6): "));
        searchTables(seats);
        break;
      case 2:
        let customerID4 = parseInt(prompt("Enter customer ID for 4-seating table: "));
        queue4Seating.enqueue(customerID4);
        break;
      case 3:
        let customerID6 = parseInt(prompt("Enter customer ID for 6-seating table: "));
        queue6Seating.enqueue(customerID6);
        break;
      case 4:
        let reservedCustomerID4 = parseInt(prompt("Enter reserved customer ID for 4-seating table: "));
        queue4Seating.enqueueWithPriority(reservedCustomerID4);
        break;
      case 5:
        let reservedCustomerID6 = parseInt(prompt("Enter reserved customer ID for 6-seating table: "));
        queue6Seating.enqueueWithPriority(reservedCustomerID6);
        break;
      case 6:
        bookTable(4);
        break;
      case 7:
        bookTable(6);
        break;
      case 8:
        let tableNumber = parseInt(prompt("Enter table number to free: "));
        let tableSeats = parseInt(prompt("Enter number of seats (4 or 6): "));
        freeTable(tableNumber, tableSeats);
        break;
      case 9:
        alert("Exiting...");
        return;
      default:
        alert("Invalid choice. Try again.");
    }
  }
}

main();
