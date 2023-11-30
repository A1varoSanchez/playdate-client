function calculateAge(birthday) {

    const birthdayDate = new Date(birthday)
    const today = new Date()
    const calculation = today - birthdayDate
    const age = new Date(calculation)

    return Math.abs(age.getUTCFullYear() - 1970)
}

export default calculateAge