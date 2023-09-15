export const gradientColor = (colorFrom: string, colorTo: string) => {
    const gradient = {
        linearGradient: {x1: 0, x2: 1, y1: 0, y2: 0},
        stops: [
            [0, colorFrom], // start
            [1, colorTo],
        
        ]
    }
    return gradient
}