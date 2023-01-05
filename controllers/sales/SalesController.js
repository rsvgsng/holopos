const SalesModel = require("../../models/SalesModel")
const moment = require('moment')


const CreateSale = async (req, res) => {
    try {
        const { TotalPrice, Items } = req.body

        if (!TotalPrice || !Items) return res.status(400).json({ message: "Error while creating sale. Make sure you fill all the necessary details.", status: 400 })
       

        const Sale = new SalesModel({
            TotalPrice: TotalPrice,
            Items: Items
        })
   
     await Sale.save();

        res.send({ message: "Sale Created", status: 200, TotalPrice, Items })
    } catch (error) {
        res.status(400).json({ message: "Error Occured", status: 400 })
    }

}


const GetSales = async (req, res) => {
    try {
     
// queries for sorting between 2 dates

if(req.query.range){
    try {
        var range = req.query.range.split('_')
        var start = range[0]
        var end = range[1]
        const SalesRange = await SalesModel.find({
            date:{
                $gte: new Date(new Date(start).setHours(00, 00, 00)),
                $lte: new Date(new Date(end).setHours(23, 59, 59))
            }
        }).sort({date:-1}).select({_id:0,__v:0})
        if(SalesRange.length === 0) return res.send({ message: `No Sales from ${range[0]} to ${range[1]} `, status: 200 })
        res.send({ message: `Sales from ${range[0]} to ${range[1]} `,NumberOfSales:SalesRange.length , status: 200, SalesRange })
   
    } catch (error) {
        res.status(400).json({ message: "Invalid Date format or Something went Wrong", status: 400 })
    }
  
}


// queries by particular date

        if(req.body.SalesDate)
        {

            try {
              
                const SalesDate = await SalesModel.find({
                    date:({
                        $gte:new Date(new Date(req.body.SalesDate).setHours(00, 00, 00))                        ,
                        $lte:new Date(new Date(req.body.SalesDate).setHours(23, 59, 59))
                    })
                }).sort({date:-1}).select({_id:0,__v:0})
                
                if(SalesDate.length === 0) return res.send({ message: `No Sales on this date ${req.body.SalesDate}`, status: 200 })
                
                return res.send({ message: `Sales on this date ${req.body.SalesDate}`, status: 200, SalesDate })
            
            } catch (error) {
               return res.status(400).json({ message: "Error Occured", status: 400 })
            }
        }


// queries by sorting by ( all time, today, week, month, year)

        if(req.query.sort){

        switch (req.query.sort) {

            case "all":
                const Sales = await SalesModel.find().sort({date:-1}).select({_id:0,__v:0})
                res.send({ message: "All Time Sales", status: 200, Sales })
                break;



            case "today":
                const today = moment().startOf('day')
                const SalesToday = await SalesModel.find({
                    date:{
                        $gte: today.toDate(),
                        $lte: moment(today).endOf('day').toDate()
                    }

                }).sort({date:-1}).select({_id:0,__v:0})
                res.send({ message: "Today's Sales", TotalSales:SalesToday.length ,  status: 200, SalesToday })
                break;



            case "week":
                const week = moment().startOf('week')
                const SalesWeek = await SalesModel.find({
                    date:{
                        $gte: week.toDate(),
                        $lte: moment(week).endOf('week').toDate()
                    }
                }).sort({date:-1}).select({_id:0,__v:0})
                res.send({ message: "This Week's Sales", status: 200, SalesWeek })
                break;





            case "month":
                const month = moment().startOf('month')
                const SalesMonth = await SalesModel.find({
                    date:{
                        $gte: month.toDate(),
                        $lte: moment(month).endOf('month').toDate()
                    }
                }).sort({date:-1}).select({_id:0,__v:0})
                res.send({ message: "This Month's Sales", status: 200, SalesMonth })
                break;






            case "year":
                const year = moment().startOf('year')
                const SalesYear = await SalesModel.find({
                    date:{
                        $gte: year.toDate(),
                        $lte: moment(year).endOf('year').toDate()

                    }
                }).sort({date:-1}).select({_id:0,__v:0})
                res.send({ message: "This Year's Sales", status: 200, SalesYear })
                break;




            default:

                res.status(400).json({ message: "Please provide a valid sort query", status: 400 })
            
            }
        }


    } catch (error) {
        
        res.status(400).json({ message: "Error Occured", status: 400 })

    }

}

module.exports = {
    CreateSale,
    GetSales
}