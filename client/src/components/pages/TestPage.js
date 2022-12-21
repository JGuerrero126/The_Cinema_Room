import React, { useEffect, useState } from "react";

function TestPage() {
  // console.log("testpage log");
  function doNothing() {}

  async function wait() {
    setTimeout(doNothing, 2000);
  }

  wait();

  return (
    <div data-testid="test-page">
      <p>test page</p>
    </div>
  );
}

export default TestPage;
