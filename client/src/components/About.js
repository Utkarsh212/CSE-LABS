import React from 'react'
import lnmiitLogo from '../images/lnmiitLogo.png'

function About() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fadeIn">
      {/* <h1 className="text-3xl pt-24 text-center font-semibold font-sans md:text-4xl lg:text-5xl">
        About Us
      </h1> */}
      <img src={lnmiitLogo} alt="LNMIIT Logo" className='w-[250px] mt-24 border-[1px] border-gray-200'/>
      <p className="text-center mx-10 md:max-w-4xl">
        The project — “APP design for virtual Experiments on Control system
        Engineering” was developed in the session 2022-2023 under the supervision
        and guidance of Dr Bharat Verma of the Electronics and Communication
        Department, The LNM Institute of Information Technology, Jaipur.
        <br />
        <br />
        This project aimed to develop a set of labs to deliver the core concepts
        of Control Systems and Engineering in a significantly simpler, more
        informative and interactive way. All the labs are designed based on plug
        and play, enabling the user to enter a set of inputs and record the
        automatically generated outputs. Each lab instance is created using the
        MATLAB App Designer. Each lab has two components: the first is manual,
        and the second is the link to lab simulation. The manual contains
        experiment theory and all the steps required to perform the experiments
        on the corresponding lab's simulations. To know more about the working
        of the labs, please refer to the manual attached to each specific lab.
      </p>
    </div>
  )
}

export default About
