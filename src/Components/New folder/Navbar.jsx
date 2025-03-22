import { useState } from 'react';

function Navbar({ setSelectedCountry, setSelectedYear, setSelectedMonth }) {
  const [countries] = useState(['USA', 'India', 'Germany', 'China']); // Example data
  const [years] = useState(['2020', '2021', '2022', '2023']);
  const [months] = useState(['January', 'February', 'March', 'April']);

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href=".">
          World Temperature Visualizer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Country Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="countryDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Country
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {countries.map((country) => (
                  <li key={country}>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedCountry(country)}
                    >
                      {country}
                    </button>
                  </li>
                ))}
              </ul>
            </li>

            {/* Year Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="yearDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Year
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {years.map((year) => (
                  <li key={year}>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </button>
                  </li>
                ))}
              </ul>
            </li>

            {/* Month Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="monthDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Month
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {months.map((month) => (
                  <li key={month}>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedMonth(month)}
                    >
                      {month}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
