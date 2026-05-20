/* 
  COPY AND PASTE THIS SCHEMA CODE INTO YOUR SANITY STUDIO PROJECT
  File: schemas/testimonial.js
*/

export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required().error('Full Name is required.')
    },
    {
      name: 'jobTitle',
      title: 'Job Title & Company',
      type: 'string',
      description: 'Optional. E.g. Foreman, Telecom Inc.'
    },
    {
      name: 'rating',
      title: 'Rating (Stars)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5).error('Rating must be between 1 and 5.')
    },
    {
      name: 'text',
      title: 'Testimonial Text',
      type: 'text',
      validation: Rule => Rule.required().error('Testimonial text is required.')
    },
    {
      name: 'date',
      title: 'Submission Date',
      type: 'string',
      description: 'Automatically saved date string'
    }
  ]
}
