const uis = [
  {
    id: "dashboard",
    data: `        <div class="wrapper">
          <div>
            <div class="cards-container">
              <div class="cards-head">
                <h3>My Cards</h3>
                <button>Add New</button>
              </div>
              <div class="cards-con-main">
                <div class="atm">
                  <img src="/images/visa.png" alt="" />
                  <b class="balance">$ 5,000</b>
                  <b class="card-number"
                    ><span>1230</span><span>4670</span><span>6630</span></b
                  >
                  <span class="card-name">Okolie Amuche A.</span>
                </div>
                <div class="atm">
                  <img src="/images/master.png" alt="" />
                  <b class="balance">$ 200,000</b>
                  <b class="card-number"
                    ><span>1230</span><span>4670</span><span>6630</span></b
                  >
                  <span class="card-name">Okolie Amuche A.</span>
                </div>
              </div>
            </div>
            <div class="transactions">
              <div class="transactions-head">
                <h3>Transactions</h3>
                <select>
                  <option value="Month">Month</option>
                  <option value="Week">Week</option>
                </select>
              </div>
              <ul class="transactions-list">
                <li>
                  <div>
                    <i class="far fa-image"></i><span>Wedding Video</span>
                  </div>
                  <span class="date">April 10, 2023</span> <span>$200</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>
                <li>
                  <div>
                    <i class="far fa-image"></i><span>Wedding Video</span>
                  </div>
                  <span class="date">April 10, 2023</span> <span>$200</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>
                <li>
                  <div>
                    <i class="far fa-image"></i><span>Wedding Video</span>
                  </div>
                  <span class="date">April 10, 2023</span> <span>$200</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>
                <li>
                  <div>
                    <i class="far fa-image"></i><span>Wedding Video</span>
                  </div>
                  <span class="date">April 10, 2023</span> <span>$200</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>
                <li>
                  <div>
                    <i class="far fa-image"></i><span>Wedding Video</span>
                  </div>
                  <span class="date">April 10, 2023</span> <span>$200</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div class="chart-head">
              <div>
                <button id="expenses">Expenses</button>
                <button id="income">Income</button>
              </div>
              <div>
                <span>D</span><span>M</span><span>W</span
                ><span class="active">All</span>
              </div>
            </div>
            <canvas id="myChart" width="100%" height="70"></canvas>
            <h2>History</h2>
            <ul class="history">
              <li>
                <div class="inner">
                  <i class="far fa-image"></i>
                  <div>
                    <span>Wedding Video</span
                    ><span class="history-date">April 10, 2023</span>
                  </div>
                </div>
                <span>$200</span>
              </li>
              <li>
                <div class="inner">
                  <i class="far fa-image"></i>
                  <div>
                    <span>Wedding Video</span
                    ><span class="history-date">April 10, 2023</span>
                  </div>
                </div>
                <span>$200</span>
              </li>
              <li>
                <div class="inner">
                  <i class="far fa-image"></i>
                  <div>
                    <span>Wedding Video</span
                    ><span class="history-date">April 10, 2023</span>
                  </div>
                </div>
                <span>$200</span>
              </li>
              <li>
                <div class="inner">
                  <i class="far fa-image"></i>
                  <div>
                    <span>Wedding Video</span
                    ><span class="history-date">April 10, 2023</span>
                  </div>
                </div>
                <span>$200</span>
              </li>
              <li>
                <div class="inner">
                  <i class="far fa-image"></i>
                  <div>
                    <span>Wedding Video</span
                    ><span class="history-date">April 10, 2023</span>
                  </div>
                </div>
                <span>$200</span>
              </li>
            </ul>
          </div>
        </div>`,
  },
  {
    id: "statistic",
    data: `<div>
          <div class="chart-head">
            <div>
              <button id="expenses">Expenses</button>
              <button id="income">Income</button>
            </div>
            <div>
              <span>D</span><span>M</span><span>W</span
              ><span class="active">All</span>
            </div>
          </div>
          <canvas id="myChart" width="100%" height="25"></canvas>
          <h2>History</h2>
          <ul class="history">
            <li>
              <div class="inner">
                <i class="far fa-image"></i>
                <div>
                  <span>Wedding Video</span
                  ><span class="history-date">April 10, 2023</span>
                </div>
              </div>
              <span>$200</span>
            </li>
            <li>
              <div class="inner">
                <i class="far fa-image"></i>
                <div>
                  <span>Wedding Video</span
                  ><span class="history-date">April 10, 2023</span>
                </div>
              </div>
              <span>$200</span>
            </li>
            <li>
              <div class="inner">
                <i class="far fa-image"></i>
                <div>
                  <span>Wedding Video</span
                  ><span class="history-date">April 10, 2023</span>
                </div>
              </div>
              <span>$200</span>
            </li>
            <li>
              <div class="inner">
                <i class="far fa-image"></i>
                <div>
                  <span>Wedding Video</span
                  ><span class="history-date">April 10, 2023</span>
                </div>
              </div>
              <span>$200</span>
            </li>
            <li>
              <div class="inner">
                <i class="far fa-image"></i>
                <div>
                  <span>Wedding Video</span
                  ><span class="history-date">April 10, 2023</span>
                </div>
              </div>
              <span>$200</span>
            </li>
          </ul>
        </div>`,
  },
  {
    id: "amountInput",
    data: `<section class="send-modal">
      <div class="send-con">
        <div class="amount">
          <p>Bank name</p>
          <input
            type="text"
            name="bankname"
            id="bankname"
            placeholder="ABC Bank"
          />
        </div>
        <div>
          <p>Account number</p>
          <input type="text" name="accountnumber" id="accountnumber" />
        </div>
        <div class="amount">
          <p>Enter amount</p>
          <input
            type="text"
            name="amount"
            id="amount"
            placeholder="$ 1 - 100,000"
          />
        </div>
        <div class="inputs">
          <button>1</button><button>2</button><button>3</button
          ><button>4</button><button>5</button><button>6</button
          ><button>7</button><button>8</button><button>9</button
          ><button>.</button><button>0</button
          ><button><i class="fas fa-delete-left"></i></button>
        </div>
        <button id="finalSend">Send</button>
      </div>
    </section>`,
  },
  {
    id: "successmessage",
    data: `<section class="sucess-modal">
      <div class="success-con">
        <div class="suc-head">
          <i class="far fa-circle-check"></i>
          <h3>Transaction Successful!</h3>
        </div>
        <div>
          <p>Your transaction has been processed successfully.</p>
          <br />
          <b class="trans-amount">Amount: [Amount]</b>
          <b class="trans-id">Transaction ID: [Transaction ID]</b>
          <b class="trans-date">Date: [Date]</b>
          <br />
          <p>Thank you for choosing our services!</p>
        </div>
      </div>
    </section>`,
  },
];
