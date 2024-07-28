//
//  PickerView.swift
//  Spinner
//
//  Created by Ann Ubaka on 3/12/24.
//

import SwiftUI

struct PickerIcon: View {
   var body: some View {
       // Customize the appearance of the picker icon
       Image(systemName: "heart.fill")
           .resizable()
           .aspectRatio(contentMode: .fit)
           .frame(width: 30, height: 30) // Adjust size as needed
           .foregroundColor(.red) // Adjust color as needed
   }
}

struct PickerIcon_Previews: PreviewProvider {
   static var previews: some View {
       PickerIcon()
   }
}
