const formatDate = (date) => {
  const newDate = new Date(date)
  return `${newDate.toLocaleString('id-ID', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  })}`
}

export default formatDate