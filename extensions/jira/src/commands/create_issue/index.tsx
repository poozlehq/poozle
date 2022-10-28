import * as React from 'react'


function CreateIssue(): React.ReactElement {
  React.useEffect(() => {
    getPost()
  }, [])

  async function getPost() {
    const response = await fetch('https://gorest.co.in/public/v2/posts')
    const data  = await response.json();
    console.log(data)
  }

  return (
    <div>
      <h2>asdasdfasdffasdf</h2>
    </div>
  )
}

export default CreateIssue
