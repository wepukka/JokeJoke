import React from 'react'
import CheckBox from 'expo-checkbox';
import { View } from 'react-native';
import { useState } from "react";


export default function ChangeCategories() {
  
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  return (
<View>
<CheckBox
    disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
  />
</View>
  )
}
