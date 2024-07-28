//
//  ContentView.swift
//  Spinner
//
//  Created by Ann Ubaka on 3/11/24.
//

import SwiftUI
// Function to generate a random duration for animation
func randomDuration() -> Double {
    return Double.random(in: 1...6)
}

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

struct MainView: View {
    // State variables to manage user input and data
    @State var itemElement: String = "" // Text field input
    @ObservedObject var viewModel: WheelSectorViewModel // ViewModel instance
    
    // State variable to control the rotation angle
    @State var rotationAngle: Double = 0
    @State var isSpinning: Bool = false
    
    // Constant angular velocity for rotation
    let angularVelocity: Double = 720 // 360 degrees per second
    
    // Frames
    let wheelFrame: (CGFloat, CGFloat) = (300,300)
    
    @State var startingOffsetY: CGFloat = UIScreen.main.bounds.height * 0.75
    @State var currDragOffsetY: CGFloat = 0
    @State var endingOffsetY: CGFloat = 0
    
    var body: some View {
        //Main stack; used for bacgkround
        ZStack {
            Color(#colorLiteral(red: 0.9174461961, green: 0.7464284301, blue: 0.9083302021, alpha: 1)).ignoresSafeArea()
            
            // Foreground components
            // Wheel Spinner Screen
            VStack {
                Text("Welcome! Please enter your choices here.")
                TextField("Items go here", text: $itemElement) // Text field for user input
                    .textFieldStyle(RoundedBorderTextFieldStyle()) // Apply a rounded border to the text field
                    .padding(.horizontal)
                    .frame(width: 300)
                
                // Wheel view with picker
                ZStack {
                    //Wheel View Only
                    ZStack {
                        Circle()
                            .fill(Color(#colorLiteral(red: 0.6711944938, green: 0.668287456, blue: 0.7133514285, alpha: 0.5))) // Background circle color
                            .frame(width: 350, height: 350)
                            .shadow(radius: 10)
                        ForEach(0..<viewModel.segments.count, id: \.self) { index in
                            Pie(startAngle: Angle(degrees: Double(index) * (360.0 / Double(viewModel.segments.count))), // Calculate start angle based on segment index
                                endAngle: Angle(degrees: Double(index + 1) * (360.0 / Double(viewModel.segments.count)))) // Calculate end angle based on segment index
                            .fill(self.viewModel.segments[index].color) // Fill the segment with color from the ViewModel
                            .frame(width: wheelFrame.0, height: wheelFrame.1)
                            .overlay(
                                Text(self.viewModel.segments[index].label) // Display the label text
                                    .padding(10)
                                    .rotationEffect(self.labelPosition(forIndex: index).rotation) // Apply rotation
                                    .position(self.labelPosition(forIndex: index).position)
                                    .foregroundColor(.black)
                                    .font(.system(size: 12))
                                    .lineLimit(1)
                                    .frame(width: 100, height: 50)
                                    .scaledToFit()
                                    .alignmentGuide(HorizontalAlignment.center) { _ in
                                        0
                                    }
                                    .alignmentGuide(VerticalAlignment.center) { _ in
                                        0
                                    }
                            )
                            //.border(.yellow)
                            .frame(width: 400, height: 350)
                            .scaledToFill()
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
                                            let sectionAngle = 360.0 / Double(viewModel.segments.count)
                                            let fixedAngle = 90.0 // Angle at which the spinner icon is fixed (12 o'clock position)
                                            let normalizedRotationAngle = (rotationAngle + fixedAngle).truncatingRemainder(dividingBy: 360)
                                            // Calculate the winner index based on the angle directly underneath the spinner icon
                                            let relativeAngle = (360 - normalizedRotationAngle).truncatingRemainder(dividingBy: 360)
                                            let winnerIndex = Int((relativeAngle / sectionAngle)) % viewModel.segments.count
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
                        .padding(10)
                        .foregroundColor(.white)
                        .font(.headline)
                }
            }
            
            // User input Screen for modifying inputs
            InputView(viewModel: viewModel)
            //.cornerRadius(inputRadius)
                .offset(y: startingOffsetY)
                .offset(y: currDragOffsetY)
                .offset(y: endingOffsetY)
                .gesture(
                    DragGesture()
                        .onChanged{ value in
                            withAnimation(.spring()) {
                                currDragOffsetY = value.translation.height
                            }
                        }
                        .onEnded{ value in
                            withAnimation(.spring()) {
                                if currDragOffsetY < -150 {
                                    endingOffsetY = -startingOffsetY
                                }
                                else if endingOffsetY != 0 && currDragOffsetY > 150 {
                                    endingOffsetY = 0
                                }
                                
                                currDragOffsetY = 0
                                
                            }
                        }
                )
                .ignoresSafeArea(edges: .bottom)
        }
    }
    // Calculate the position for the label text
    func labelPosition(forIndex index: Int) -> (position: CGPoint, rotation: Angle) {
        let segmentCount = viewModel.segments.count
        let startAngle = 360.0 / Double(segmentCount) * Double(index)
        let endAngle = 360.0 / Double(segmentCount) * Double(index + 1)
        let angleIncrement = endAngle - startAngle
        let midAngle = startAngle + (angleIncrement / 2)
        let textRadius: Double = Double(min(wheelFrame.0, wheelFrame.1)) * 0.25
        //let wheelCenter: (Double, Double) = (wheelFrame.0/2,wheelFrame.1/2)
        
        // Calculate the midpoint of the segment
        let midPointAngle = (midAngle * .pi / 180)
        
        let x = textRadius * CGFloat(cos(midPointAngle))
        let y = textRadius * CGFloat(sin(midPointAngle))
        
        // Calculate the rotation angle for the label text
        let rotationAngle = Angle(degrees: midAngle)
        
        return (CGPoint(x: x, y: y), rotationAngle)
    }
}
struct Main_Previews: PreviewProvider {
    static var previews: some View {
        MainView(viewModel: WheelSectorViewModel())
    }
}
