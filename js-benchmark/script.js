const $globalCode = document.querySelector("#global");
const $runButton = document.querySelector(".run-tests");

async function runTest({ code, data }) {
  const duration = 1000;

  let result
  try {
    result = await eval(`async () => {
      let PERF__ops = 0;
      let PERF__startTime = Date.now();
      let PERF__endTime = Date.now() + ${duration};
      ${data};
  
      while (PERF__startTime < PERF__endTime) {
        ${code};
        PERF__ops++;
      }
      return PERF__ops;
    }()`)
  } catch (error) {
    result = 0;
  }

  return result

}
async function runTestCases() {
  // Magia

  const $testCases = document.querySelectorAll(".test-case");

  const globalCode = $globalCode.value;

  $testCases.forEach((testCase) => {
    const $code = testCase.querySelector(".code");
    const $ops = testCase.querySelector(".ops");

    const codeValue = $code.value;
    $ops.textContent = "Loading...";

    console.log(codeValue);
  });
}

// run test cases on init
runTestCases();

$runButton.addEventListener("click", () => {
  runTestCases();
});
