import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

function FAQ() {
    const faq = [{
        question: "What Is a Tracking Number & Where Can I Find It?",
        answer: "A tracking number or ID is a combination of numbers and possibly letters that uniquely identifies your shipment for national or international tracking. Usually, the shipper or online shop is able to provide the tracking number or ID. If you have ordered a product in an online shop, the confirmation email or shipment tracking notification often contains the tracking number or ID. If not, please contact your shipper or online shop."
    },
    {
        question: "When will my tracking information appear?",
        answer: "Tracking events usually appear 24-48 hours after receiving the Track and Trace ID. In general, once the shipment has reached our facility, a tracking event will appear."
    },
    {
        question: "Why is my tracking number/ID not working?",
        answer: "Please make sure you entered the correct tracking number in the correct format: Check for minimum length of 5 characters, and if there are any special characters in your input. Tab, comma, space and semicolon are understood as separators between several tracking IDs.If your tracking ID is not working, please contact your shipper or online shop."
    },
    {
        question: "If I do not have my tracking number, is it still possible to track my shipment?",
        answer: "If you do not have a tracking number, we advise you to contact your shipper. However, if you have other shipping reference numbers, they may work using shipment tracking systems of the specific business unit in charge of the shipment (for example: SwiftShipping Express or SwiftShipping Freight)."
    }]
    return (
        <section className='px-4 py-12 md:px-10 w-full'>
            <h2 className='text-3xl font-extrabold tracking-tighter py-4'>Frequently Asked Questions </h2>
            <Accordion type="single" collapsible className="w-full">
                {faq.map((item, idx) => {
                    return (
                        <AccordionItem value={`item-${idx}`} key={idx}>
                            <AccordionTrigger className='text-left md:text-xl'>{item.question}</AccordionTrigger>
                            <AccordionContent>
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </section>

    )
}
export default FAQ
