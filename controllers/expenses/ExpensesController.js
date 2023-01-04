const ExpensesModel = require("../../models/ExpensesModel");
var { ExpensesCategoryList } = require("../../misc/CustomCategories")


const CreateExpenses = async (req, res) => {

    try {
        const { ExpensesName, ExpensesAmount, ExpensesCategory, ExpensesDescription, ExpensesDate } = req.body;

        if (!ExpensesCategoryList().ExpensesCategory.includes(ExpensesCategory)) return res.status(400).send({ message: "Invalid Expenses Category" });

        const newExpenses = new ExpensesModel({
            ExpensesName,
            ExpensesAmount,
            ExpensesCategory,
            ExpensesDescription,
            ExpensesDate
        })

        const savedExpenses = await newExpenses.save();
        
        res.status(200).send({
            message: "Expenses Created",
            data: savedExpenses
        });

    } catch (error) {
        res.status(400).send({ message: "Invalid Inputs or Server Error" })
    }




}


const EditExpenses = async (req, res) => {
    try {
        const { ExpensesName, ExpensesAmount, ExpensesCategory, ExpensesDescription, ExpensesDate } = req.body;
        if (!ExpensesName || !ExpensesAmount || !ExpensesCategory || !ExpensesDescription || !ExpensesDate) return res.status(400).send({ message: "All fields are required" });
        if (!ExpensesCategoryList().ExpensesCategory.includes(ExpensesCategory)) return res.status(400).send({ message: "Invalid Expenses Category" });

        const Expenses = await ExpensesModel.findByIdAndUpdate(req.params.id, {
            ExpensesName : ExpensesName,
            ExpensesAmount : ExpensesAmount,
            ExpensesCategory : ExpensesCategory,
            ExpensesDescription : ExpensesDescription,
            ExpensesDate: ExpensesDate
        });

        res.status(200).send({
            message: "Expenses Updated",

        })


    } catch (error) {
        res.status(400).send({ message: "Invalid Inputs or Server Error" })
    }
}

module.exports = 
{

     CreateExpenses,
     EditExpenses 
}