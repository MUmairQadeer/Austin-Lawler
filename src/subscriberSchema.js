/* 
  COPY AND PASTE THIS SCHEMA CODE INTO YOUR SANITY STUDIO PROJECT
  File: schemas/subscriber.js
*/

export default {
  name: 'subscriber',
  title: 'Waitlist Subscriber',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email().error('A valid email address is required.')
    },
    {
      name: 'source',
      title: 'Source Page',
      type: 'string',
      description: 'Which page they subscribed from (Store or Training)',
    },
    {
      name: 'date',
      title: 'Subscription Date',
      type: 'string',
    }
  ]
}
