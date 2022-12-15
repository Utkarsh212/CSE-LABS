import React from 'react'
import lnmiitLogo from '../images/lnmiitLogo.png'
import imagesData from '../data/images'

function About() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fadeIn">
      {/* <h1 className="text-3xl pt-24 text-center font-semibold font-sans md:text-4xl lg:text-5xl">
        About Us
      </h1> */}
      <img src={lnmiitLogo} alt="LNMIIT Logo" className='w-[250px] mt-24' />
      <p className="text-center mx-10 md:max-w-4xl">
        The project — “APP design for virtual Experiments on Control system
        Engineering” was developed in the session 2022-2023 under the supervision
        and guidance of Dr Bharat Verma of the Electronics and Communication
        Department, The LNM Institute of Information Technology, Jaipur.
        <br />
        <br />
        The project aims to develop a comprehensive platform for all the Control System and Engineering needs. The application enables free access to numerous learning resources on the Control System and Engineering, to which anyone can&nbsp;
        <a className="text-blue-600 hover:underline" href="https://github.com/Utkarsh212/CSE-Labs/issues/new" target="_blank" rel="noreferrer">
          contribute
        </a>
        . It includes all the MATLAB Apps, Thesis Reports, and Functional Packages&#40;Based on the control system and engineering subject&#41;, which have been and will be developed by the students of LNMIIT. The project was created with a vision to deliver the core concepts of Control Systems and Engineering to the students. For continuous evolution and to keep pace with modern technological demands, The project is made OpenSource as it is designed and developed by the community and for the community
      </p>
      <div className='flex flex-col justify-start items-center space-y-10 pb-10'>
        <h1 className="text-3xl pt-5 text-center font-semibold font-sans">Meet The Team</h1>
        <div className='flex flex-col justify-start items-center space-y-1'>
          <img className="w-36 rounded-full" src={imagesData.mentor.link} alt="mentor avatar"/>
          <div className='text-center'>
            <h4 className='font-semibold'>{imagesData.mentor.name}</h4>
            <h5 className='font-normal text-sm'>Founder & Mentor</h5>
          </div>
        </div>
        <ul className='grid grid-cols-3 gap-10'>
          {imagesData.maintainers.map(maintainer => <li className='flex flex-col justify-start items-center space-y-1'>
            <img className="w-24 rounded-full" src={maintainer.link} alt="maintainers avatar"/>
            <div className='text-center'>
              <h4 className='font-semibold'>{maintainer.name}</h4>
              <h5 className='font-normal text-sm'>Maintainer</h5>
            </div>
          </li>)}
        </ul>
      </div>
    </div>
  )
}

export default About
