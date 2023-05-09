class Calendar extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        this.innerHTML = `

        <div class="calendar container">
        <div class="d-flex flex-column justify-content-center">
           
            
            <p>First select a service from the drop-down list bellow.</p>
           
            <select  id="service" class="form-select" aria-label="Default select example">
                <option selected>Select a service</option>
                <option value="1">Ironing service</option>
                <option value="2">Dry cleaning and laundry</option>
                <option value="3">Alteration service</option>
              </select>
              <div><hr></div>
              <p>Next, select a drop-off date from the calendar. The date on which your items should be ready will be highlighted in green.</p>
            <div><hr></div>
            <div class="text-center">
                <button class="btn btn-secondary" onclick="previousMonth()">Previous</button>
                <span id="currentMonth"></span>
                <button class="btn btn-secondary" onclick="nextMonth()">Next</button>
            </div>
            <br>
            <table id="calendar">
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <br>
            <div>
                
                <span id="information"></span>
            </div>
        </div>
    </div>

        `;
      }



  }

  customElements.define('calendar-component', Calendar);