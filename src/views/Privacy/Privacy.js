import React from 'react'
//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import CoreLayout from '../../layouts/CoreLayout'
import Content from '../../components/Content'

import './Privacy.scss'

const getLink = (url, text = 'this url') => {
  if (url.startsWith('/')) {
    return (<Link to={url}>{text}</Link>)
  } else {
    return (<a href={url} target='_blank' rel='noopener noreferrer'>{text}</a>)
  }
}

export const Privacy = (props) => (
  <CoreLayout {...props} className='tc-privacy-view'>
    <Content use='headline4'>Privacy Policy</Content>

    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='1.	Introduction'
    >
      <div>
        1.1	We are committed to safeguarding the privacy of our website visitors and 
        service users.
      </div>
      <div>
        1.2	This policy applies where we are acting as a data controller with respect 
        to the personal data of our website visitors and service users; in other words, 
        where we determine the purposes and means of the processing of that personal data.
      </div>
      <div>
        1.3	We use cookies on our website. Insofar as those cookies are not strictly 
        necessary for the provision of our website and services, we will ask you to consent 
        to our use of cookies when you first visit our website.
      </div>
      <div>
        1.4	Our website incorporates privacy controls which affect how we will process your 
        personal data. By using the privacy controls, you can specify whether you would like 
        to receive direct marketing communications. 
        {process.env.PRIVACY_SETTINGS && 
          <span>You can access the privacy controls via{getLink(process.env.PRIVACY_SETTINGS, 'settings')}
          (you must be logged in to access controls).</span>}
      </div>
      <div>
        1.5	In this policy, "we", "us" and "our" refer to {process.env.SITE_DISPLAY}.
        For more information about us, see Section 13.
      </div>
    </Content>
    
    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='2.	Credit'
    >
      <div>
        2.1	This document was created using a template from SEQ Legal 
        {getLink('https://seqlegal.com', 'https://seqlegal.com')}
      </div>
    </Content>

    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='3.	How we use your personal data'
    >
      <div>
        3.1	In this Section 3 we have set out:
        <div>
          (a)	the general categories of personal data that we may process;
        </div>
        <div>
          (b)	any additional information received from any single sign on
          services you choose to login with, including: first and last name, 
          email address, location, profile picture;
          {/* TODO improve details in this section with SSO data */}
        </div>
        <div>
          (c)	the purposes for which we may process personal data; and
        </div>
        <div>
          (d)	the legal bases of the processing.
        </div>
      </div>
      <div>
        3.2	We may process data about your use of our website and services 
        ("<strong>usage data</strong>"). The usage data may include your IP 
        address, geographical location, browser type and version, operating 
        system, referral source, length of visit, page views and website 
        navigation paths, as well as information about the timing, frequency 
        and pattern of your service use. The source of the usage data is 
        Google Analytics. 
        {/* TODO make dynamic using other tracking systems (intercom?) */}
        {/* TODO add source of the usage link?? */}
        This usage data may be processed for the purposes of analysing the use of the 
        website and services. The legal basis for this processing is our legitimate 
        interests, namely monitoring and improving our website and services.
      </div>
      <div>
        3.3	We may process your account data ("<strong>account data</strong>").
        The account data may include your name and email address. The source of 
        the account data is you, your employer, or you single sign on platform of choice.
        The account data may be processed for the purposes of operating our website, 
        providing our services, ensuring the security of our website and services, 
        maintaining back-ups of our databases and communicating with you.
        The legal basis for this processing is our legitimate interests, namely 
        the proper administration of our website and business.
      </div>
      <div>
        3.4	We may process your information included in your personal profile on 
        our website ("<strong>profile data</strong>"). The profile data may include 
        your name, address, telephone number, email address, profile pictures, gender, 
        date of birth, relationship status, interests and hobbies, educational details 
        and employment details. The profile data may be processed for the purposes of 
        enabling and monitoring your use of our website and services. The legal basis 
        for this processing is our legitimate interests, namely the proper administration 
        of our website and business.
      </div>
      <div>
        3.5	We may process your personal data that are provided in the course of the use 
        of our services ("<strong>service data</strong>"). The service data may include 
        services you request, information you provide to fulfill those requests, or any
        other information requested by this website. The source of the service data is 
        you or your employer. The service data may be processed for the purposes of 
        operating our website, providing our services, ensuring the security of our 
        website and services, maintaining back-ups of our databases and communicating 
        with you. The legal basis for this processing is our legitimate interests, 
        namely the proper administration of our website and business.
      </div>
      <div>
        3.6	We may process information that you post for publication on our website or 
        through our services ("<strong>publication data</strong>"). The publication data 
        may be processed [for the purposes of enabling such publication and administering 
        our website and services]. The legal basis for this processing is consent.
      </div>
      <div>
        3.7	We may process information contained in any enquiry you submit to us regarding 
        goods and/or services ("<strong>enquiry data</strong>"). The enquiry data may be 
        processed for the purposes of offering, marketing and selling relevant goods and/or 
        services to you. The legal basis for this processing is consent.
      </div>
      <div>
        3.8	We may process information relating to our customer relationships, including 
        customer contact information ("<strong>customer relationship data</strong>"). The 
        customer relationship data may include your name, your employer, your job title or role, 
        your contact details, and information contained in communications between us and you or 
        your employer. The source of the customer relationship data is you or your employer. 
        The customer relationship data may be processed for the purposes of managing our 
        relationships with customers, communicating with customers, keeping records of 
        those communications and promoting our products and services to customers. The 
        legal basis for this processing is our legitimate interests, namely the proper 
        management of our customer relationships.
      </div>
      <div>
        3.9	We may process information relating to transactions, including purchases of 
        goods and services, that you enter into with us and/or through our website 
        ("<strong>transaction data</strong>"). The transaction data may include your 
        contact details, your card details and the transaction details. The transaction 
        data may be processed for the purpose of supplying the purchased goods and 
        services and keeping proper records of those transactions. The legal basis 
        for this processing is the performance of a contract between you and us and/or 
        taking steps, at your request, to enter into such a contract and our legitimate 
        interests, namely the proper administration of our website and business.
      </div>
      <div>
        3.10	We may process information that you provide to us for the purpose of 
        subscribing to our email notifications and/or newsletters ("<strong>notification data
        </strong>"). The notification data may be processed for the purposes of sending you 
        the relevant notifications and/or newsletters. The legal basis for this processing 
        is consent.
      </div>
      <div>
        3.11	We may process information contained in or relating to any communication that 
        you send to us ("<strong>correspondence data</strong>"). The correspondence data may 
        include the communication content and metadata associated with the communication. 
        Our website will generate the metadata associated with communications made using the 
        website contact forms. The correspondence data may be processed for the purposes of 
        communicating with you and record-keeping. The legal basis for this processing is 
        our legitimate interests, namely the proper administration of our website and 
        business and communications with users.
      </div>
      <div>
        3.12	We may process any additional information uploading to this website during its use.
        This data may include any information contained in any files of any format. The source of 
        this data is you. This data may be processed for fulfill any services requests specified at
        the time of upload. The legal basis for this processing is consent.
      </div>
      <div>
        3.13	We may process any of your personal data identified in this policy where necessary 
        for the establishment, exercise or defence of legal claims, whether in court proceedings 
        or in an administrative or out-of-court procedure. The legal basis for this processing 
        is our legitimate interests, namely the protection and assertion of our legal rights, 
        your legal rights and the legal rights of others.
      </div>
      <div>
        3.14	We may process any of your personal data identified in this policy where necessary 
        for the purposes of obtaining or maintaining insurance coverage, managing risks, or 
        obtaining professional advice. The legal basis for this processing is our legitimate 
        interests, namely the proper protection of our business against risks.
      </div>
      <div>
        3.15	In addition to the specific purposes for which we may process your personal data 
        set out in this Section 3, we may also process any of your personal data where such 
        processing is necessary for compliance with a legal obligation to which we are subject, 
        or in order to protect your vital interests or the vital interests of another natural person.
      </div>
      <div>
        3.16	Please do not supply any other person's personal data to us, unless we prompt you to do so.
      </div>
    </Content>

    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='4.	Providing your personal data to others'
    >
      <div>
        4.1	We may disclose your personal data to any member of our group of companies (this means 
        our subsidiaries, our ultimate holding company and all its subsidiaries) insofar as reasonably 
        necessary for the purposes, and on the legal bases, set out in this policy. 
        {process.env.PRIVACY_SUBSIDIARIES && 
          <span>
             Information about our group of companies can be found at
             {getLink(process.env.PRIVACY_SUBSIDIARIES)}
          </span>}
      </div>
      <div>
        4.2	We may disclose your personal data to our insurers and/or professional advisers insofar 
        as reasonably necessary for the purposes of obtaining or maintaining insurance coverage, 
        managing risks, obtaining professional advice, or the establishment, exercise or defence 
        of legal claims, whether in court proceedings or in an administrative or out-of-court procedure.
      </div>
      <div>
        4.3	We may disclose information about your location or services you have requested to our 
        suppliers or subcontractors
        {process.env.PRIVACY_SUBCONTRACTORS && 
          <span>identified at{getLink(process.env.PRIVACY_SUBCONTRACTORS)}</span>}
        insofar as reasonably necessary for fufill any requests for services made by you on this website.
      </div>
      <div>
        4.4	Financial transactions relating to our website and services are handled by our payment 
        services providers
        {(process.env.PRIVACY_PSP_NAME && process.env.PRIVACY_PSP_URL) && 
          <span> ({getLink(process.env.PRIVACY_PSP_URL, process.env.PRIVACY_PSP_NAME)})</span>}. 
        We will share transaction data with our payment services providers only to the extent necessary 
        for the purposes of processing your payments, refunding such payments and dealing with complaints 
        and queries relating to such payments and refunds. 
        {process.env.PRIVACY_PSP_POLICY && 
          <span>
            You can find information about the payment services providers' privacy policies 
            and practices at{getLink(process.env.PRIVACY_PSP_POLICY)}.
          </span>}
      </div>
      <div>
        4.5	We may disclose your enquiry data to one or more of those selected third party suppliers of 
        goods and services identified on our website for the purpose of enabling them to contact you so that 
        they can offer, market and sell to you relevant goods and/or services. Each such third party will 
        act as a data controller in relation to the enquiry data that we supply to it; and upon contacting 
        you, each such third party will supply to you a copy of its own privacy policy, which will govern 
        that third party's use of your personal data.
      </div>
      <div>
        4.6	In addition to the specific disclosures of personal data set out in this Section 4, we 
        may disclose your personal data where such disclosure is necessary for compliance with a 
        legal obligation to which we are subject, or in order to protect your vital interests or 
        the vital interests of another natural person. We may also disclose your personal data where 
        such disclosure is necessary for the establishment, exercise or defence of legal claims, whether 
        in court proceedings or in an administrative or out-of-court procedure.
      </div>
    </Content>

    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='5.	International transfers of your personal data'
    >
      <div>
        5.1	In this Section 5, we provide information about the circumstances in which your personal data 
        may be transferred to countries outside the European Economic Area (EEA).
      </div>
      <div>
        5.2	We and our other group companies have offices and facilities 
        {process.env.PRIVACY_COUNTRY_OFFICES
          ? <span>in {process.env.PRIVACY_COUNTRY_OFFICES}</span>
          : <span>countries outside the EU</span>}.
        The European Commission has made an "adequacy decision" with respect to the data protection laws 
        of each of these countries. Transfers to each of these countries will be protected by appropriate 
        safeguards, namely the use of standard data protection clauses adopted or approved by the 
        European Commission, a copy of which can be obtained from 
        {getLink('https://ec.europa.eu/info/law/law-topic/data-protection/data-transfers-outside-eu/adequacy-protection-personal-data-non-eu-countries_en')}.
      </div>
      <div>
        5.3	The hosting facilities for our website are situated in 
        {process.env.PRIVACY_COUNTRY_HOSTING
          ? <span>in {process.env.PRIVACY_COUNTRY_HOSTING}</span>
          : <span>countries outside the EU</span>}.
        The European Commission has made an "adequacy decision" with respect to the data protection laws 
        of each of these countries. Transfers to each of these countries will be protected by appropriate 
        safeguards, namely the use of standard data protection clauses adopted or approved by the 
        European Commission, a copy of which you can obtain from
        {getLink('https://ec.europa.eu/info/law/law-topic/data-protection/data-transfers-outside-eu/adequacy-protection-personal-data-non-eu-countries_en')}.
      </div>
      <div>
        5.4	Specify category or categories of supplier or subcontractor are situated include
        {process.env.PRIVACY_COUNTRY_SUPPLIERS
          ? <span>in {process.env.PRIVACY_COUNTRY_SUPPLIERS}</span>
          : <span>countries outside the EU</span>}.
        The European Commission has made an "adequacy decision" with respect to the data protection laws 
        of each of these countries. Transfers to each of these countries will be protected by appropriate 
        safeguards, namely the use of standard data protection clauses adopted or approved by the 
        European Commission, a copy of which can be obtained from 
        {getLink('https://ec.europa.eu/info/law/law-topic/data-protection/data-transfers-outside-eu/adequacy-protection-personal-data-non-eu-countries_en')}.
      </div>
      <div>
        5.5	You acknowledge that personal data that you submit for publication through our website or 
        services may be available, via the internet, around the world. We cannot prevent the use 
        (or misuse) of such personal data by others.
      </div>
    </Content>
    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='6.	Retaining and deleting personal data'
    >
      <div>
        6.1	This Section 6 sets out our data retention policies and procedure, which are designed to 
        help ensure that we comply with our legal obligations in relation to the retention and deletion 
        of personal data.
      </div>
      <div>
        6.2	Personal data that we process for any purpose or purposes shall not be kept for longer than 
        is necessary for that purpose or those purposes.
      </div>
      <div>
        6.3	We will retain your personal data as follows:
        <div>
          (a)	You contact information will be retained for a minimum period of 2 years following the date 
          you sign up for the service, and for a maximum period of 6 years following your cancellation 
          of the service.
        </div>
        <div>
          (b)	Your support communication history will be retained for a minimum period of 2 years following 
          the date you sign up for the service, and for a maximum period of 6 years following your 
          cancellation of the service.
        </div>
      </div>
      <div>
        6.4	In some cases it is not possible for us to specify in advance the periods for which your 
        personal data will be retained. In such cases, we will determine the period of retention based 
        on the following criteria:
        <div>
          (a)	the period of retention of your transcation information will be determined based on requirements 
          of taxation laws
        </div>
        <div>
          (b)	the period of retention of your usage data will be determined based on policies of the analytics
          platforms used
        </div>
      </div>
      <div>
        6.5	Notwithstanding the other provisions of this Section 6, we may retain your personal data where 
        such retention is necessary for compliance with a legal obligation to which we are subject, or in 
        order to protect your vital interests or the vital interests of another natural person.
      </div>
    </Content>
    
    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='7.	Amendments'
    >
      <div>
        7.1	We may update this policy from time to time by publishing a new version on our website.
      </div>
      <div>
        7.2	You should check this page occasionally to ensure you are happy with any changes to this policy.
      </div>
      <div>
        7.3	We may notify you of significant changes to this policy by email or through the private messaging 
        system on our website.
      </div>
    </Content>

    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='8.	Your rights'
    >
      <div>
        8.1	In this Section 8, we have summarised the rights that you have under data protection law. Some 
        of the rights are complex, and not all of the details have been included in our summaries. 
        Accordingly, you should read the relevant laws and guidance from the regulatory authorities for a 
        full explanation of these rights.
      </div>
      <div>
        8.2	Your principal rights under data protection law are:
        <div>
          (a)	the right to access;
        </div>
        <div>
          (b)	the right to rectification;
        </div>
        <div>
          (c)	the right to erasure;
        </div>
        <div>
          (d)	the right to restrict processing;
        </div>
        <div>
          (e)	the right to object to processing;
        </div>
        <div>
          (f)	the right to data portability;
        </div>
        <div>
          (g)	the right to complain to a supervisory authority; and
        </div>
        <div>
          (h)	the right to withdraw consent.
        </div>
      </div>
      <div>
        8.3	You have the right to confirmation as to whether or not we process your personal data and, where we 
        do, access to the personal data, together with certain additional information. That additional 
        information includes details of the purposes of the processing, the categories of personal data concerned 
        and the recipients of the personal data. Providing the rights and freedoms of others are not affected, we 
        will supply to you a copy of your personal data. The first copy will be provided free of charge, but 
        additional copies may be subject to a reasonable fee.
        {process.env.PRIVACY_PERSONAL_DATA && 
          <span> You can access your personal data by visiting{getLink(process.env.PRIVACY_PERSONAL_DATA, 'this url')}
          when logged into our website.</span>}
      </div>
      <div>
        8.4	You have the right to have any inaccurate personal data about you rectified and, taking into account 
        the purposes of the processing, to have any incomplete personal data about you completed.
      </div>
      <div>
        8.5	In some circumstances you have the right to the erasure of your personal data without undue delay. 
        Those circumstances include: the personal data are no longer necessary in relation to the purposes for which 
        they were collected or otherwise processed; you withdraw consent to consent-based processing; you object to 
        the processing under certain rules of applicable data protection law; the processing is for direct marketing 
        purposes; and the personal data have been unlawfully processed]. However, there are exclusions of the right 
        to erasure. The general exclusions include where processing is necessary: for exercising the right of freedom 
        of expression and information; for compliance with a legal obligation; or for the establishment, exercise or 
        defence of legal claims.
      </div>
      <div>
        8.6	In some circumstances you have the right to restrict the processing of your personal data. Those 
        circumstances are: you contest the accuracy of the personal data; processing is unlawful but you oppose 
        erasure; we no longer need the personal data for the purposes of our processing, but you require personal 
        data for the establishment, exercise or defence of legal claims; and you have objected to processing, pending 
        the verification of that objection. Where processing has been restricted on this basis, we may continue to 
        store your personal data. However, we will only otherwise process it: with your consent; for the 
        establishment, exercise or defence of legal claims; for the protection of the rights of another natural 
        or legal person; or for reasons of important public interest.
      </div>
      <div>
        8.7	You have the right to object to our processing of your personal data on grounds relating to your particular 
        situation, but only to the extent that the legal basis for the processing is that the processing is necessary 
        for: the performance of a task carried out in the public interest or in the exercise of any official authority 
        vested in us; or the purposes of the legitimate interests pursued by us or by a third party. If you make such 
        an objection, we will cease to process the personal information unless we can demonstrate compelling legitimate 
        grounds for the processing which override your interests, rights and freedoms, or the processing is for the 
        establishment, exercise or defence of legal claims.
      </div>
      <div>
        8.8	You have the right to object to our processing of your personal data for direct marketing purposes 
        (including profiling for direct marketing purposes). If you make such an objection, we will cease to process 
        your personal data for this purpose.
      </div>
      <div>
        8.9	You have the right to object to our processing of your personal data for scientific or historical research 
        purposes or statistical purposes on grounds relating to your particular situation, unless the processing is 
        necessary for the performance of a task carried out for reasons of public interest.
      </div>
      <div>
        8.10	To the extent that the legal basis for our processing of your personal data is:
        <div>
          (a)	consent; or
        </div>
        <div>
          (b)	that the processing is necessary for the performance of a contract to which you are party or in order 
          to take steps at your request prior to entering into a contract, and such processing is carried out by 
          automated means, you have the right to receive your personal data from us in a structured, commonly used 
          and machine-readable format. However, this right does not apply where it would adversely affect the rights 
          and freedoms of others.
        </div>
      </div>
      <div>
        8.11	If you consider that our processing of your personal information infringes data protection laws, you 
        have a legal right to lodge a complaint with a supervisory authority responsible for data protection. You 
        may do so in the EU member state of your habitual residence, your place of work or the place of the alleged 
        infringement.
      </div>
      <div>
        8.12	To the extent that the legal basis for our processing of your personal information is consent, you have 
        the right to withdraw that consent at any time. Withdrawal will not affect the lawfulness of processing before 
        the withdrawal.
      </div>
      <div>
        8.13	You may exercise any of your rights in relation to your personal data by written notice to us, in 
        addition to the other methods specified in this Section 8.
      </div>
    </Content>

    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='9.	About cookies'
    >
      <div>
        9.1	A cookie is a file containing an identifier (a string of letters and numbers) that is sent by a web server 
        to a web browser and is stored by the browser. The identifier is then sent back to the server each time the 
        browser requests a page from the server.
      </div>
      <div>
        9.2	Cookies may be either "persistent" cookies or "session" cookies: a persistent cookie will be stored by a 
        web browser and will remain valid until its set expiry date, unless deleted by the user before the expiry 
        date; a session cookie, on the other hand, will expire at the end of the user session, when the web browser 
        is closed.
      </div>
      <div>
        9.3	Cookies do not typically contain any information that personally identifies a user, but personal 
        information that we store about you may be linked to the information stored in and obtained from cookies.
      </div>
    </Content>

    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='10.	Cookies that we use'
    >
      <div>
        10.1	We use cookies for the following purposes:
        <div>
          (a)	authentication - we use cookies to identify you when you visit our website and as you navigate our 
          website (cookies used for this purpose are: com.auth0.auth.*);
        </div>
        <div>
          (b)	status - we use cookies to help us to determine if you are logged into our website (cookies used 
          for this purpose are: com.auth0.auth.*);
        </div>
        <div>
          (c)	personalisation - we use cookies to store information about your preferences and to personalise 
          the website for you (cookies used for this purpose are: language);
        </div>
        <div>
          (d)	security - we use cookies [as an element of the security measures used to protect user accounts, 
          including preventing fraudulent use of login credentials, and to protect our website and services 
          generally (cookies used for this purpose are: com.auth0.auth.*);
        </div>
        <div>
          {/* TODO update avertising cookies */}
          (e)	advertising - we use cookies to help us to display advertisements that will be relevant to you 
          (cookies used for this purpose are: _ga, _gid);
        </div>
        <div>
          (f)	analysis - we use cookies to help us to analyse the use and performance of our website and 
          services (cookies used for this purpose are: _ga, _gid); and
        </div>
        <div>
          (g)	[cookie consent - we use cookies to store your preferences in relation to the use of cookies 
          more generally (cookies used for this purpose are: __cookie_policy_accept).
        </div>
      </div>
    </Content>

    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='11.	Cookies used by our service providers'
    >
      <div>
        11.1	Our service providers use cookies and those cookies may be stored on your computer when 
        you visit our website.
      </div>
      <div>
        11.2	We use Google Analytics to analyse the use of our website. Google Analytics gathers 
        information about website use by means of cookies. The information gathered relating to our 
        website is used to create reports about the use of our website. Google's privacy policy is 
        available at: https://www.google.com/policies/privacy/. The relevant cookies are: _ga, _gid.
      </div>
      <div>
        11.3	
        {process.env.PRIVACY_ADWORDS && 
          <span>
            We publish Google AdSense interest-based advertisements on our website. These 
            are tailored by Google to reflect your interests. To determine your interests, Google 
            will track your behaviour on our website and on other websites across the web using cookies.
          </span>}
        {!process.env.PRIVACY_ADWORDS && 
          <span>
            We publish Google AdSense advertisements on our website. To determine your interests, 
            Google will track your behaviour on our website and on other websites across the web 
            using cookies. This behaviour tracking allows Google to tailor the advertisements 
            that you see on other websites to reflect your interests (but we do not publish 
            interest-based advertisements on our website). You can view, delete or add interest 
            categories associated with your browser by visiting: 
            {getLink('https://adssettings.google.com', 'https://adssettings.google.com')}. 
            You can also opt out of the AdSense partner network cookie using those settings or 
            using the Network Advertising Initiative's multi-cookie opt-out mechanism at: 
            {getLink('http://optout.networkadvertising.org', 'http://optout.networkadvertising.org')}. 
            However, these opt-out mechanisms themselves use cookies, and if you clear the cookies 
            from your browser your opt-out will not be maintained. To ensure that an opt-out is 
            maintained in respect of a particular browser, you may wish to consider using the 
            Google browser plug-ins available at: 
            {getLink('https://support.google.com/ads/answer/7395996', 'https://support.google.com/ads/answer/7395996')}.
            . The relevant cookies are: _ga, _gid.
            {/* TODO add opt-out cookies */}
          </span>}
      </div>
      {/* TODO support for other chat clients (intercom?) */}
      {process.env.CHAT_CLIENT_ID && 
          <div>
            11.4	We use Crisp chat to support this website. This service uses cookies to store 
            your identiy for use with our in app support chat software to retain history of your 
            support requests. You can view the privacy policy of this service provider at 
            {getLink('https://crisp.chat/en/privacy/')}. The relevant cookies are: 
            __cfduid, crisp-client*.
          </div>}
    </Content>

    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='12.	Managing cookies'
    >
      <div>
        12.1	Most browsers allow you to refuse to accept cookies and to delete cookies. 
        The methods for doing so vary from browser to browser, and from version to version. 
        You can however obtain up-to-date information about blocking and deleting cookies 
        via these links:
        <div>
          (a)	
          {getLink(
            'https://support.google.com/chrome/answer/95647?hl=en',
            'https://support.google.com/chrome/answer/95647?hl=en'
          )} (Chrome);
        </div>
        <div>
          (b)
          {getLink(
            'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences',
            'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences'
          )} (Firefox);
        </div>
        <div>
          (c)
          {getLink(
            'http://www.opera.com/help/tutorials/security/cookies/',
            'http://www.opera.com/help/tutorials/security/cookies/'
          )} (Opera);
        </div>
        <div>
          (d)
          {getLink(
            'https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies',
            'https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies'
          )} (Internet Explorer);
        </div>
        <div>
          (e)
          {getLink(
            'https://support.apple.com/kb/PH21411',
            'https://support.apple.com/kb/PH21411'
          )} (Safari); and
        </div>
        <div>
          (f)
          {getLink(
            'https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy',
            'https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy'
          )} (Edge).
        </div>
      </div>
      <div>
        12.2	Blocking all cookies will have a negative impact upon the usability of many websites.
      </div>
      <div>
        12.3	If you block cookies, you will not be able to use all the features on our website.
      </div>
    </Content>

    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='13.	Our details'
    >
      <div>
        {/* TODO add support for optional parameters? */}
        13.1	This website is owned and operated by {process.env.PRIVACY_COMPANY_LEGAL_NAME}.
      </div>
      <div>
        13.2	We are registered in {process.env.PRIVACY_COMPANY_LEGAL_NAME} under registration 
        number {process.env.PRIVACY_COMPANY_LEGAL_NUMBER}, and our registered office is at 
        {process.env.PRIVACY_COMPANY_LEGAL_ADDRESS}.
      </div>
      <div>
        13.3	Our principal place of business is at {process.env.PRIVACY_COMPANY_OFFICE_ADDRESS}.
      </div>
      <div>
        13.4	You can contact us:
        <div>
          (a)	by post, to the postal address given above;
        </div>
        <div>
          (b)	using our website contact form
          {process.env.PRIVACY_COMPANY_CONTACT && 
            <span> at {getLink(process.env.PRIVACY_COMPANY_CONTACT)}</span>};
        </div>
        <div>
          (c)	by telephone, on the contact number published on our website from time to time;
        </div>
        <div>
          (d)	by email, using the email address published on our website from time to time;
        </div>
        {process.env.CHAT_CLIENT_ID &&
          <div>
            (f) by chat, using the chat application on the website, if currently available.
          </div>}
      </div>
    </Content>

    <Content 
      className='tc-privacy-view__section'
      headerType='headline5'
      header='14.	Data protection officer'
    >
      <div>
        14.1	Our data protection officer's contact details are: 
         {process.env.PRIVACY_COMPANY_OFFICER}.
      </div>
    </Content>
  </CoreLayout>
)

// TODO define props
Privacy.defaultProps = {
}

Privacy.propTypes = {
}

export default Privacy
