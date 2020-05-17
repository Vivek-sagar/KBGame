const getCoord = (code: number) => {
    var letter = String.fromCharCode(code)
    if (letter == 'Q')
        return [0, 0]
    else if (letter == 'W')
        return [0, 1]
    else if (letter == 'E')
        return [0, 2]
    else if (letter == 'R')
        return [0, 3]
    else if (letter == 'T')
        return [0, 4]
    else if (letter == 'Y')
        return [0, 5]
    else if (letter == 'U')
        return [0, 6]
    else if (letter == 'I')
        return [0, 7]
    else if (letter == 'O')
        return [0, 8]
    else if (letter == 'A')
        return [1, 0]
    else if (letter == 'S')
        return [1, 1]
    else if (letter == 'D')
        return [1, 2]
    else if (letter == 'F')
        return [1, 3]
    else if (letter == 'G')
        return [1, 4]
    else if (letter == 'H')
        return [1, 5]
    else if (letter == 'J')
        return [1, 6]
    else if (letter == 'K')
        return [1, 7]
    else if (letter == 'L')
        return [1, 8]
    else if (letter == 'Z')
        return [2, 0]
    else if (letter == 'X')
        return [2, 1]
    else if (letter == 'C')
        return [2, 2]
    else if (letter == 'V')
        return [2, 3]
    else if (letter == 'B')
        return [2, 4]
    else if (letter == 'N')
        return [2, 5]
    else if (letter == 'M')
        return [2, 6]
    else if (letter == ',')
        return [2, 7]
    else if (letter == '.')
        return [2, 8]
    return [-1, -1]
}

const getCellIndexFromCoord = (coord: number[]) =>
{
    return coord[0]*8 + coord[1]
}

const getScreenCoordFromCoord = (i: number, j: number) => {
    return [100 + (15 * i) + 38 * j, 100 + 28 * i]
}

export {
    getCoord,
    getCellIndexFromCoord,
    getScreenCoordFromCoord,
}