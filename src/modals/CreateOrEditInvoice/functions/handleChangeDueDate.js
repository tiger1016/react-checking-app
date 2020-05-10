export default that => dueDate => that.setState({ dueDate: dueDate.format('MM/DD/YYYY') })
