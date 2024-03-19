function LicensePlugin() {
    // Listen when div class="l-shell__app-logo" is clicked
    let logo = document.querySelector('.l-shell__app-logo');
    logo.addEventListener('click', function () {
        // Check if the user is logged in
        // If not logged in
        let container = document.querySelector('.c-about__text'); // Corrected the selector

        // Create title element
        let title = document.createElement('h2');
        title.classList.add('license-title');
        title.innerText = 'University of San Andres Autonomous Ship Control Software';
        container.appendChild(title);

        // Create text element
        let text = document.createElement('p');
        text.classList.add('license-text');
        text.innerText = 'In pursuit of cutting-edge advancements in maritime technology, the University of San Andres proudly presents its Autonomous Ship Control Software. Developed by a team of dedicated researchers and engineers, this software represents a significant leap forward in the realm of autonomous marine navigation.';
        container.appendChild(text);

        // Create key features section
        let keyFeaturesTitle = document.createElement('h3');
        keyFeaturesTitle.classList.add('key-features-title');
        keyFeaturesTitle.innerText = 'Key Features:';
        container.appendChild(keyFeaturesTitle);

        // Create unordered list for key features
        let keyFeaturesList = document.createElement('ul');
        keyFeaturesList.classList.add('key-features-list');

        // Add key features to the list
        let keyFeatures = [
            'Autonomous Navigation: Our software utilizes state-of-the-art algorithms to enable precise and autonomous navigation, ensuring the safe and efficient traversal of maritime routes.',
            'Collision Avoidance: The built-in collision avoidance system employs advanced sensors and machine learning capabilities, allowing the autonomous vessel to adapt to dynamic maritime environments and avoid potential hazards.',
            'Adaptive Route Planning: The software intelligently analyzes real-time data, weather conditions, and traffic patterns to optimize route planning, ensuring the most efficient and secure path for the vessel.',
            'Remote Monitoring and Control: Operators can remotely monitor and control the autonomous ship through a user-friendly interface, enabling intervention when necessary and ensuring a seamless integration with existing maritime control systems.'
        ];

        keyFeatures.forEach(feature => {
            let listItem = document.createElement('li');
            listItem.innerText = feature;
            keyFeaturesList.appendChild(listItem);
        });

        // Append the key features list to the container
        container.appendChild(keyFeaturesList);

        // Create Open Source and Reserved Rights section
        let openSourceTitle = document.createElement('h3');
        openSourceTitle.classList.add('open-source-title');
        openSourceTitle.innerText = 'Open Source and Reserved Rights:';
        container.appendChild(openSourceTitle);

        // Create text for Open Source and Reserved Rights
        let openSourceText = document.createElement('p');
        openSourceText.classList.add('open-source-text');
        openSourceText.innerText = 'In alignment with the spirit of collaboration and innovation, the University of San Andres is pleased to release this Autonomous Ship Control Software as open source. The codebase is accessible to the public, allowing developers, researchers, and maritime enthusiasts worldwide to contribute to its enhancement and evolution.\n\nHowever, it is essential to note that all rights pertaining to the original software and its intellectual property remain the exclusive property of the University of San Andres. While the software is open source and available for use and modification, any derivative work, commercial use, or distribution requires explicit permission from the University.';
        container.appendChild(openSourceText);

        // Create Disclaimer text
        let disclaimerText = document.createElement('p');
        disclaimerText.classList.add('disclaimer-text');
        disclaimerText.innerText = 'Disclaimer:\nThe University of San Andres takes pride in the rigorous development and testing processes undertaken to ensure the reliability and safety of the Autonomous Ship Control Software. However, users are advised to exercise caution and adhere to maritime regulations when deploying this software in real-world scenarios.\n\nFor inquiries, collaboration opportunities, or permission requests, please contact the University of San Andres at contact@universitysanandres.edu.\n\nCopyright © 2024 University of San Andres. All Rights Reserved.';
        container.appendChild(disclaimerText);

        // Add your contact and copyright information
    });
}
