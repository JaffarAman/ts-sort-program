import fs from "fs";
import path from "path";
import readLine from "readline";

class NumberList {
  private numbers: number[] = [];
  constructor() {}

  //convert number String into number Array
  stringToNumberArray(delimiter: string): void {
    const numberArray = delimiter.split("");
    this.numbers = numberArray.map((s) => parseInt(s));
  }

  // Sort the list of number in descending order by default
  sort(order: "asc" | "desc" = "desc") {
    if (order === "asc") {
      this.numbers.sort((a, b) => a - b);
    } else {
      this.numbers.sort((a, b) => b - a);
    }
  }

  //convert number Array into number String
  numberArrayToString() {
    return this.numbers.join(", ");
  }

  addOneMillion(numbers: number[]) {
    this.numbers.push(...numbers);
  }
}

class FileIO {
  constructor() {}

  // read contents to an output file
  static readInputFile(inputFile: string): string {
    try {
      return fs.readFileSync(path.join(__dirname, inputFile), "utf-8");
    } catch (error) {
      // Handles errors if the input file cannot be read
      console.error(`Error reading input file: ${error}`);
      process.exit(1);
    }
  }

  // Writes contents to an output file
  static writeSortedNumbersToFile(outputFile: string, contents: string) {
    try {
      fs.writeFileSync(path.join(__dirname, outputFile), contents);
    } catch (error) {
      // Handles errors if the output file cannot be written
      console.error(`Error writing output file: ${error}`);
      process.exit(1);
    }
  }
}

function main() {
  const number = new NumberList();

  const rL = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Prompt the user for input file and delimiter
  rL.question(
    "Enter the name of the input file with the extension like 'input.txt: '  ",
    function (inputFile) {
      rL.question(
        "Enter the delimiter used in the input file: ",
        (delimiter) => {
          FileIO.readInputFile(inputFile);
          //   convert delimiter string into number array
          number.stringToNumberArray(delimiter);

          // Prompt the user for sorting order
          rL.question(
            "Enter the sorting order, such as ascending type 'asc' or descending type 'desc': ",
            (sortOrder: string) => {
              //Sort Number list to user define order
              number.sort(sortOrder === "asc" ? "asc" : "desc");

              // convert numbers array into the simple String
              const numberString = number.numberArrayToString();

              // Prompt the user for output file name
              rL.question(
                "Enter the name of the output file with the extension like 'output.txt: ",
                function (outputFile) {
                  rL.close();
                  // Use default name if no name provided
                  outputFile = outputFile || "output.txt";
                  // Write the sorted numbers to the output file
                  FileIO.writeSortedNumbersToFile(outputFile, numberString);
                }
              );
            }
          );
        }
      );
    }
  );
}

// const performanceTest = () => {
//   // Function to generate a random number between min and max
//   function getRandomInt(min: number, max: number) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
//   // Generate a large list of random numbers (e.g., 1 million numbers)
//   const largeList = [];
//   const listSize = 1000000;
//   for (let i = 0; i < listSize; i++) {
//     largeList.push(getRandomInt(1, 1000000));
//   }
//   // Measure the time it takes to sort the list
//   const startTime = Date.now();
//   largeList.sort((a, b) => a - b); // Sort in ascending order
//   const endTime = Date.now();

//   // Calculate the execution time
//   const executionTime = endTime - startTime;

//   console.log(
//     `Sorting ${listSize} numbers took ${executionTime} milliseconds.`
//   );
// };
// performanceTest();

main();
