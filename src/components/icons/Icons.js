import React from 'react';

import {GiPalette} from 'react-icons/gi';
import {BsFillGrid3X3GapFill} from 'react-icons/bs';
export const PaletteIcon = (props)=>(
  <i className="icons">
        <GiPalette {...props} />
    </i>
)

export const NineGridIcon = (props)=>(
  <i className="icons">
        <BsFillGrid3X3GapFill {...props} />
    </i>
)