const mongoose = require('mongoose')

const entrySchema = mongoose.Schema({
    name: String,
    number: String
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length < 3) {
    console.log('Command not accepted. Try using the correct format: node mongo.js password')
    process.exit(1)
}else if(process.argv.length === 3){
    const password = process.argv[2]
    const url = `mongodb+srv://fullstack:${password}@test.gc71kqg.mongodb.net/appNote?retryWrites=true&w=majority&appName=Test`
    mongoose.connect(url)
        .then(()=>console.log("Connected"))
        .catch((e)=>console.log(e))
    mongoose.set('strictQuery',false)

    Entry.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(note => {
            console.log(note.name + " " + note.number)
        })
        mongoose.connection.close()
    })

}else if(process.argv.length < 5 || process.argv.length > 3){
    console.log('Command not accepted. Try using the correct format: node mongo.js password name number')
    process.exit(1)
}else{
    const name = process.argv[3]
    const number = process.argv[4]
    const entry = new Entry({
        name: name,
        number: number
    })

    entry.save().then(result => {
        console.log('Note saved')
        mongoose.connection.close()
    })
}

