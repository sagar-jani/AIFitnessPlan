import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const MacroCalculator = () => {
  const [amazonLink, setAmazonLink] = useState('https://www.amazon.com/dp/B0BRGWJ1QF');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        switch (data.country_code) {
          case 'US':
            setAmazonLink('https://www.amazon.com/dp/B0BRGWJ1QF');
            break;
          case 'UK':
            setAmazonLink('https://www.amazon.co.uk/dp/B0BRGWJ1QF');
            break;
          case 'IN':
            setAmazonLink('https://www.amazon.in/dp/B0BRGWJ1QF');
            break;
          case 'AU':
            setAmazonLink('https://www.amazon.com.au/dp/B0BRGWJ1QF');
            break;
          // Add more cases for other countries as needed
        }
      })
      .catch(error => console.error(error));
  }, [setAmazonLink]);

  return (
    <div className='flex'>
      <ul className='mx-auto'>
        <li className='inline-block mx-2'>
          <Link href='/about' className="px-4 py-2 text-xl font-medium text-primary hover:text-gray-400">Macro Recipe</Link>
        </li>

      </ul>
    </div >

  )
}

export default MacroCalculator
