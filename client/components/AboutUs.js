import React from 'react'

export default function AboutUs() {
  return (
    <div>
      <div className="aboutDiv">
        <h1 id="aboutTitle">About us</h1>
        <div className="photo">
          <div className="student">
            <div className="pictures">
              <img src="/images/tali.jpeg" alt="Tali" />
            </div>
            <div className="presentation">
              <span>Taulant Vokshi</span>
              <p>Kossovo</p>
              <div className="github">
                <img src="/images/download.png" />
                <a href="https://github.com/Taulantvokshi">@Taulantvokshi</a>
              </div>
              <div className="linkedin">
                <img src="/images/download-1.png" />
                <a href="https://www.linkedin.com/in/taulant-vokshi/">
                  taulant-vokshi
                </a>
              </div>
            </div>
          </div>
          <div className="student">
            <div className="pictures">
              <img src="/images/milan.jpeg" alt="Milan" />
            </div>
            <div className="presentation">
              <span>Milan Patel</span>
              <p>United States</p>
              <div className="github">
                <img src="/images/download.png" />
                <a href="https://github.com/milanhpatel">@milanhpatel</a>
              </div>
              <div className="linkedin">
                <img src="/images/download-1.png" />
                <a href="https://www.linkedin.com/in/milan-patel-93698131/">
                  milan-patel
                </a>
              </div>
            </div>
          </div>
          <div className="student">
            <div className="pictures">
              <img src="/images/Sihem_1.jpg" alt="Sihem" />
            </div>
            <div className="presentation">
              <span>Sihem Meriki</span>
              <p>France</p>
              <div className="github">
                <img src="/images/download.png" />
                <a href="http://github.com/SihemMrk">@SihemMrk</a>
              </div>
              <div className="linkedin">
                <img src="/images/download-1.png" />
                <a href="https://www.linkedin.com/in/sihem-meriki/">
                  sihem-meriki
                </a>
              </div>
            </div>
          </div>
          <div className="student">
            <div className="pictures">
              <img src="/images/maurice.jpeg" alt="Maurice" />
            </div>
            <div className="presentation">
              <span>Maurice Shalam</span>
              <p>United States</p>
              <div className="github">
                <img src="/images/download.png" />
                <a href="https://github.com/mshalam">@mshalam</a>
              </div>
              <div className="linkedin">
                <img src="/images/download-1.png" />
                <a href="https://www.linkedin.com/in/mauriceshalam/">
                  mauriceshalam
                </a>
              </div>
            </div>
          </div>
        </div>
        <div />
        <div className="fullstack">
          <span>All student at Fullstack Academy of Code in New York</span>
        </div>
      </div>
    </div>
  )
}
