import React from 'react';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

 function ButtonIcon({variant, color, title, icon, action, data}) {
   let startIcon = <Add />;
   if(icon === 'add'){
     // icon = <Add />
   }

  return (
    <Button variant={variant} color={color}  startIcon={startIcon} onClick={()=> action(data) }>
        {title}
    </Button>
  );
}

 function ButtonOnly({variant, color, title, icon, action, data}) {
   return (
     <Button variant={variant} color={color}   onClick={()=> action(data) } >
         {title}
     </Button>
   );
 }

 export {
    ButtonIcon,
    ButtonOnly,
  }



