//
//  ContentView.swift
//  Spinner
//
//  Created by Ann Ubaka on 3/11/24.
//

import SwiftUI

// Custom Shape for drawing a pie segment
struct Pie: Shape {
    var startAngle: Angle
    var endAngle: Angle
    
    // Path construction for the pie segment
    func path(in rect: CGRect) -> Path {
        var path = Path()
        let center = CGPoint(x: rect.midX, y: rect.midY)
        path.move(to: center)
        path.addArc(center: center, radius: rect.width / 2, startAngle: startAngle, endAngle: endAngle, clockwise: false)
        path.closeSubpath()
        return path
    }
}

// Function to generate a random color that is different from the previous segment
func randomColor(previousColor: Color?) -> Color {
    // Define an array of baby/pastel girly cutesy colors
    let pastelColors: [Color] = [
        Color(red: 255/255, green: 204/255, blue: 204/255), // Baby Pink
        Color(red: 255/255, green: 229/255, blue: 204/255), // Baby Peach
        Color(red: 204/255, green: 255/255, blue: 204/255), // Baby Mint
        Color(red: 204/255, green: 229/255, blue: 255/255), // Baby Blue
        Color(red: 255/255, green: 204/255, blue: 255/255), // Baby Lavender
        Color(red: 255/255, green: 255/255, blue: 204/255), // Baby Yellow
        Color(red: 255/255, green: 204/255, blue: 229/255), // Baby Coral
        Color(red: 204/255, green: 204/255, blue: 255/255), // Baby Lilac
        Color(red: 255/255, green: 229/255, blue: 255/255), // Baby Blush
        Color(red: 204/255, green: 255/255, blue: 255/255)  // Baby Aqua
    ]
    
    // Filter out the previous color if it exists
    let availableColors = pastelColors.filter { $0 != previousColor }
    
    // Generate a random index to select a color from the available colors
    let randomIndex = Int.random(in: 0..<availableColors.count)
    
    // Return the randomly selected color
    return availableColors[randomIndex]
}

// Function to generate a random duration for animation
func randomDuration() -> Double {
    return Double.random(in: 1...6)
}

struct WheelView: View {
    // State variables to manage user input and data
    @State private var itemElement: String = "" // Text field input
    @ObservedObject var viewModel = WheelSectorViewModel() // ViewModel instance
    
    // State variable to control the rotation angle
    @State private var rotationAngle: Double = 0
    @State private var isSpinning: Bool = false
    
    // Constant angular velocity for rotation
    let angularVelocity: Double = 720 // 360 degrees per second
    
    var body: some View {
        VStack {
            Text("Welcome! Please enter your choices here.")
            TextField("Items go here", text: $itemElement) // Text field for user input
                .textFieldStyle(RoundedBorderTextFieldStyle()) // Apply a rounded border to the text field
                .padding(.horizontal)
                .frame(width: 300)
            Button(action: {
                if (!itemElement.isEmpty && viewModel.segments.count < 10) { // Check if the text field is not empty and less than 10 segments
                    let previousColor = viewModel.segments.last?.color
                    viewModel.segments.append(WheelSectorViewModel.PieSegment(color: randomColor(previousColor: previousColor), label: itemElement)) // Generate a random color for the segment and add it to the ViewModel
                    itemElement = "" // Clear the text field after adding the item
                }
            }, label: {
                Text("Add Item!")
                    .padding()
                    .padding(.horizontal, 20)
                    .foregroundColor(.white)
                    .background(
                        Color(#colorLiteral(red: 0.9174461961, green: 0.7464284301, blue: 0.9083302021, alpha: 1))
                            .cornerRadius(15.0)
                            .shadow(radius: 10)
                    )
            })
            // Draw the pie chart using segments from the ViewModel
            ZStack {
                ZStack {
                    Circle()
                        .fill(Color(#colorLiteral(red: 0.6711944938, green: 0.668287456, blue: 0.7133514285, alpha: 0.5))) // Background circle color
                        .frame(width: 400, height: 350)
                    
                    ForEach(0..<viewModel.segments.count, id: \.self) { index in
                        Pie(startAngle: Angle(degrees: Double(index) * (360.0 / Double(viewModel.segments.count))), // Calculate start angle based on segment index
                            endAngle: Angle(degrees: Double(index + 1) * (360.0 / Double(viewModel.segments.count)))) // Calculate end angle based on segment index
                            .fill(self.viewModel.segments[index].color) // Fill the segment with color from the ViewModel
                            .frame(width: 300, height: 350)
                            .overlay(
                                Text(self.viewModel.segments[index].label) // Display the label text
                                    .foregroundColor(.black)
                                    .lineLimit(1) // Ensure single line of text
                                    .frame(width: 70, height: 50)
                                    .minimumScaleFactor(0.75)
                                    .scaledToFit()
                                    .rotationEffect(self.labelRotation(forIndex: index, segmentCount: viewModel.segments.count)) // Update rotation
                                    .position(self.labelPosition(forIndex: index, segmentCount: viewModel.segments.count)) // Update position
                                    .padding([.horizontal], 10)
                            )
                            .frame(width: 400, height: 350)
                    }

                }
                .rotationEffect(Angle(degrees: rotationAngle)) // Apply rotation effect
                .gesture(
                    TapGesture()
                        .onEnded { _ in
                            if !isSpinning {
                                let randomDuration = randomDuration()
                                withAnimation(
                                    Animation.easeOut(duration: TimeInterval(randomDuration))
                                ) {
                                    rotationAngle += angularVelocity * randomDuration // Update rotation angle based on angular velocity and random duration
                                    isSpinning = true // Indicate spinning is in progress
                                    
                                    // Randomly select a winner when spinning stops
                                    DispatchQueue.main.asyncAfter(deadline: .now() + randomDuration) {
                                        // Calculate the winner index based on the heart picker position
                                        let sectionAngle = 360.0 / Double(viewModel.segments.count) // Calculate the angle for each segment
                                        let fixedAngle = 90.0 // Angle at which the spinner icon is fixed (12 o'clock position)
                                        let normalizedRotationAngle = (rotationAngle + fixedAngle).truncatingRemainder(dividingBy: 360) // Normalize the rotation angle
                                        let relativeAngle = (360 - normalizedRotationAngle).truncatingRemainder(dividingBy: 360)
                                        let winnerIndex = Int((relativeAngle / sectionAngle)) % viewModel.segments.count // Determine the winner index
                                        viewModel.winner = viewModel.segments[winnerIndex].label
                                        isSpinning = false // Indicate spinning is complete
                                    }
                                    
                                }
                            }
                        }
                )
            }.padding()
                .overlay(alignment: .top){
                    // Picker icon that points to the winner when the wheel is spun
                    PickerIcon()
                }
            
            // Display the winner if available
            if let winner = viewModel.winner {
                Text("Winner: \(winner)")
                    .padding(20)
                    .foregroundColor(.green)
                    .font(.headline)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(#colorLiteral(red: 0.9188740253, green: 0.7445629835, blue: 0.911600709, alpha: 1)))
    }
    
    // Update the labelPosition function to ensure proper positioning
    private func labelPosition(forIndex index: Int, segmentCount: Int) -> CGPoint {
        let anglePerSegment = 360.0 / Double(segmentCount)
        let midAngle = anglePerSegment * (Double(index) + 0.5)
        
        let textRadius: CGFloat = 100 // Positioning closer to the edge
        
        // Calculate the midpoint of the segment
        let midPointAngle = midAngle * .pi / 180
        let x = 150 + textRadius * CGFloat(cos(midPointAngle)) // Centering based on 200 (half of the frame width)
        let y = 175 + textRadius * CGFloat(sin(midPointAngle)) // Centering based on 175 (adjusted for half of the frame height)
        
        return CGPoint(x: x, y: y)
    }

    // Update the labelRotation function to properly rotate the labels
    private func labelRotation(forIndex index: Int, segmentCount: Int) -> Angle {
        let anglePerSegment = 360.0 / Double(segmentCount)
        let midAngle = anglePerSegment * (Double(index) + 0.5)
        return Angle(degrees: midAngle) // Ensure the rotation aligns with the segment arc
    }

    struct WheelView_Previews: PreviewProvider {
        static var previews: some View {
            WheelView()
        }
    }
}
