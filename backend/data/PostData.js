const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const posts = [
    {
        "author": "66b5d816f3fc75e5dd870dfb",
        "category": "Travel 🌍",
        "description": "Just visited the Grand Canyon! 🏞️ Breathtaking views and amazing experience.",
        "content": "The Grand Canyon is truly one of the wonders of the world. 🌄 The sheer size and scale of the canyon are awe-inspiring. Hiking down to the river was both challenging and rewarding. 🥾 The panoramic views from the lookout points were simply breathtaking. 😍 I was amazed by the rich geological history and the vibrant colors of the rock formations. 🏜️ Every turn of the trail offered a new perspective of this natural marvel. 🌅 The sunset over the canyon was a highlight of the trip, casting a golden glow over the vast expanse. 🌟 This experience has left me with a deep appreciation for the beauty of nature. If you ever have the chance to visit, don't hesitate—it’s a journey you’ll remember for a lifetime. 🌟",
        "likes": 12,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870dfc",
        "category": "Food 🍣",
        "description": "Tried sushi for the first time. 🍱 Absolutely delicious!",
        "content": "I've always been hesitant to try sushi, but today I decided to step out of my comfort zone. 🥢 The freshness of the fish and the delicate flavors of the rice were simply outstanding. 😋 I tried a variety of rolls and was pleasantly surprised by how much I enjoyed each one. 🍣 The combination of textures and flavors in sushi is unique and exciting. 🌟 From spicy tuna to eel, each bite offered a new experience. 🌶️ I particularly loved the salmon nigiri—it melted in my mouth. 🐟 The sushi restaurant had a great atmosphere, and the staff were very knowledgeable. 👨‍🍳 This meal was not only delicious but also a great adventure for my taste buds. I’m looking forward to trying more sushi in the future! 🍤",
        "likes": 8,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870dfd",
        "category": "Work 💼",
        "description": "Completed a major project at work and got recognized by the management. 🏆",
        "content": "After months of intense work and dedication, I finally completed a major project that was critical for our team. 🚀 The project involved numerous challenges, including tight deadlines and complex requirements. 📈 Despite these obstacles, we managed to deliver the project ahead of schedule. ⏱️ The recognition from management was a significant boost to my morale. 🎉 I received positive feedback from my colleagues and superiors, which made all the hard work worth it. 🙌 The experience taught me valuable lessons in project management and teamwork. 🧩 I’m proud of what we accomplished and excited for future projects. This achievement has definitely increased my confidence and motivation at work. 💪",
        "likes": 15,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870dfe",
        "category": "Fitness 🏋️‍♂️",
        "description": "Achieved my fitness goal for the month. Feeling strong! 💪",
        "content": "This month, I set a challenging fitness goal for myself—to lift a specific weight by the end of the month. 🏋️‍♂️ I dedicated myself to a rigorous training regimen, including weightlifting and cardio. 💥 The progress I made was incredible, and I finally achieved my goal. 🎯 The feeling of hitting a new personal best was exhilarating. 🌟 I noticed significant improvements in my strength and endurance. 💪 This achievement has motivated me to set even more ambitious goals for the coming months. 📆 The journey was tough, but the results were definitely worth it. 🏆 I’m proud of my dedication and excited to see where my fitness journey takes me next. 🚀",
        "likes": 9,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870dff",
        "category": "Education 📚",
        "description": "Just completed an online course on React. Learned a lot! 🎓",
        "content": "The online course I took on React was both challenging and rewarding. 📚 The course covered everything from basic components to advanced state management. 🔧 I learned how to build dynamic user interfaces and manage application state effectively. 🖥️ The hands-on projects were particularly useful in applying the concepts learned. 🛠️ Each module included practical exercises that helped reinforce my understanding. 📊 By the end of the course, I felt confident in my ability to create complex React applications. 🚀 This knowledge will definitely be beneficial for my future projects. 🌟 I’m excited to put these new skills into practice and continue growing as a developer. 🌱",
        "likes": 11,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e00",
        "category": "Technology 💻",
        "description": "Upgraded my computer setup. It's now a powerhouse! ⚡",
        "content": "After months of saving and planning, I finally upgraded my computer setup. 🖥️ The new components, including a high-performance processor and graphics card, have transformed my computer into a powerhouse. 💪 The improved performance has made a significant difference in my work and gaming experience. 🎮 Everything runs smoothly and quickly, even the most demanding applications. 🔥 The setup also includes a new monitor that enhances my productivity and gaming visuals. 📺 I’m thrilled with the results and impressed by how much of a difference these upgrades have made. 🚀 This new setup is perfect for my needs and has exceeded my expectations. 🌟",
        "likes": 14,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e01",
        "category": "Music 🎵",
        "description": "Attended a live concert of my favorite band. Amazing night! 🎤",
        "content": "The concert I attended last night was a dream come true. 🌠 My favorite band delivered an unforgettable performance. 🎶 The energy in the venue was electric, and the crowd was fully engaged. 🕺 Each song was performed with such passion and precision. 🎸 The visuals and lighting effects added to the overall experience. 💡 Singing along with the band and experiencing the music live was an incredible feeling. 🎤 The night was filled with great memories, and I felt so connected to the music. 💫 It was an experience I’ll cherish for a long time and one that has further deepened my love for live music. ❤️",
        "likes": 18,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e02",
        "category": "Travel 🚂",
        "description": "Explored the historic sites of Paris. Beautiful city! 🇫🇷",
        "content": "Exploring Paris was an amazing experience. 🗼 The city’s historic sites, such as the Eiffel Tower and Notre-Dame Cathedral, were awe-inspiring. 🏛️ Walking along the Seine River and visiting the Louvre Museum were highlights of the trip. 🖼️ The architecture and history of Paris are truly remarkable. 🏘️ Each neighborhood had its own charm, from Montmartre to Le Marais. 🌆 Sampling the local cuisine, especially the pastries, was a delight. 🥐 The city's atmosphere was vibrant and full of life. 🌟 Every corner of Paris offered something new and exciting. 🌈 This trip has given me a deep appreciation for the rich cultural heritage of this beautiful city. 💖",
        "likes": 20,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e03",
        "category": "Food 🍰",
        "description": "Baked a delicious chocolate cake. It turned out perfect! 🎂",
        "content": "I decided to bake a chocolate cake from scratch, and it turned out wonderfully. 🍫 The rich, chocolatey flavor and moist texture were just right. 😋 The process of mixing the ingredients and baking the cake was both fun and satisfying. 👩‍🍳 The cake was a hit at the family gathering, and everyone enjoyed it. 🎉 I used a recipe that included a secret ingredient to enhance the flavor. 🌟 The cake was decorated with a simple but elegant frosting. 🎨 Baking this cake has inspired me to try more recipes and improve my baking skills. 🧁 Overall, it was a rewarding experience. 👍",
        "likes": 10,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e04",
        "category": "Fitness 🏋️‍♀️",
        "description": "Joined a new yoga class. Feeling relaxed and rejuvenated! 🧘‍♀️",
        "content": "I recently joined a new yoga class, and it’s been a fantastic experience. 🧘‍♀️ The sessions are helping me improve my flexibility and reduce stress. 🌿 The instructor is knowledgeable and provides great guidance on techniques. 📚 Each class ends with a calming meditation that leaves me feeling refreshed. 🌸 I’ve also met some wonderful people who share my interest in wellness. 🤝 The environment is supportive and encouraging. 🌟 I’m looking forward to continuing this practice and exploring more advanced poses. 🧘‍♂️ Yoga has quickly become an essential part of my routine, and I’m loving the benefits it brings. 💖",
        "likes": 7,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e05",
        "category": "Education 🎓",
        "description": "Started a new online course in machine learning. Excited to learn more! 🤖",
        "content": "I’ve just started an online course in machine learning, and I’m already hooked. 📚 The course covers a range of topics, including algorithms and data analysis. 🔍 I’m particularly excited about learning how to build predictive models. 📈 The course materials are well-structured and engaging. 🌟 I’ve been doing some hands-on projects that are both challenging and rewarding. 🛠️ The community forums are also a great place to discuss concepts and get help. 🤝 I’m looking forward to applying these new skills to real-world problems. 🚀 This course is a fantastic opportunity to advance my knowledge in this rapidly evolving field. 💡",
        "likes": 13,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e06",
        "category": "Technology 🖥️",
        "description": "Upgraded my home office with new tech gadgets. Ready for productivity boost! 🚀",
        "content": "I’ve recently upgraded my home office setup with some new tech gadgets. 💻 The addition of a high-resolution monitor and a new ergonomic keyboard has made a big difference. 🖥️ The improved ergonomics have helped reduce strain during long working hours. 🕒 I also added a new webcam for better video calls. 📹 The changes have significantly boosted my productivity and comfort. 📈 I’m now enjoying a more efficient and enjoyable work environment. 🌟 These upgrades have been well worth the investment, and I’m excited to see how they will impact my daily workflow. 🚀",
        "likes": 16,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e07",
        "category": "Travel ✈️",
        "description": "Visited Tokyo and explored its vibrant neighborhoods. 🗺️ What an adventure!",
        "content": "Tokyo was an incredible destination with so much to offer. 🗺️ I explored various neighborhoods, each with its own unique charm. 🌟 From the bustling streets of Shibuya to the serene gardens of Shinjuku, every area had something special. 🌸 The food was amazing, and I enjoyed trying different local dishes. 🍣 The blend of modern skyscrapers and traditional temples was fascinating. ⛩️ The city's public transportation system was efficient and easy to navigate. 🚇 I also had the chance to experience some local festivals, which added to the excitement of the trip. 🎉 Tokyo has truly left a lasting impression on me. ❤️",
        "likes": 19,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e08",
        "category": "Food 🍜",
        "description": "Made homemade ramen from scratch. It was delicious! 🍲",
        "content": "I decided to make homemade ramen from scratch, and it was an amazing experience. 🍲 The broth was rich and flavorful, and the noodles turned out perfect. 🍜 I added a variety of toppings, including soft-boiled eggs and fresh vegetables. 🥚🥕 The whole process, from preparing the broth to cooking the noodles, was so rewarding. 👩‍🍳 The final dish was not only delicious but also a great way to spend time in the kitchen. 🕰️ I’m looking forward to experimenting with different flavors and ingredients in future ramen recipes. 🌟 This meal has definitely inspired me to try more homemade dishes. 👍",
        "likes": 11,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e09",
        "category": "Fitness 🏃‍♂️",
        "description": "Ran my first marathon. Proud of my achievement! 🏅",
        "content": "Completing my first marathon was a monumental achievement. 🏅 The training was intense, but crossing the finish line made it all worthwhile. 🏃‍♂️ The race was both physically and mentally challenging. 💪 The support from friends and fellow runners was incredible. 👏 I’m thrilled with my time and how well I managed the race. ⏱️ This experience has given me a new level of confidence and determination. 🌟 I’m already thinking about my next race and how I can continue to push my limits. 🚀 Running a marathon has been one of the most rewarding experiences of my life. 🏆",
        "likes": 22,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e0a",
        "category": "Education 🧠",
        "description": "Completed a certification in digital marketing. Ready to apply my skills! 📈",
        "content": "I’ve just completed a certification in digital marketing, and I’m excited to put my skills to use. 📈 The course covered various aspects of digital marketing, including SEO, content creation, and social media strategies. 🌐 The hands-on projects were particularly valuable in applying what I learned. 🛠️ I’m now more confident in creating and executing digital marketing campaigns. 🚀 This certification will definitely enhance my resume and open up new opportunities in the field. 🌟 I’m looking forward to applying these new skills in a professional setting. 🎯",
        "likes": 10,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e0b",
        "category": "Technology 📱",
        "description": "Got the latest smartphone model. Loving the new features! 📱",
        "content": "I recently upgraded to the latest smartphone model, and it’s fantastic. 📱 The new features, including a high-resolution camera and faster processing speed, are impressive. 📸 The design is sleek and modern, and the battery life has improved significantly. 🔋 The upgraded display makes everything look vibrant and clear. 🌟 I’m enjoying exploring all the new capabilities of the phone, from advanced photography options to enhanced security features. 🔐 This upgrade has been worth every penny, and I’m excited to make the most of the new technology. 🚀",
        "likes": 14,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e0c",
        "category": "Music 🎹",
        "description": "Learned to play a new song on the piano. Feeling accomplished! 🎹",
        "content": "I’ve been learning to play a new song on the piano, and I’m thrilled with the progress. 🎹 The piece was challenging but rewarding to master. 🌟 Practicing regularly has improved my technique and confidence. 🧑‍🎤 The satisfaction of playing the song from start to finish was incredible. 🎶 I’m looking forward to tackling more complex pieces and continuing to develop my piano skills. 🎵 This accomplishment has motivated me to keep improving and exploring new music. 🚀",
        "likes": 9,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e0d",
        "category": "Travel 🏖️",
        "description": "Spent a relaxing week at the beach. So rejuvenating! 🌴",
        "content": "I spent a wonderful week at the beach, and it was exactly what I needed. 🌴 The sound of the waves and the warm sun were incredibly relaxing. 🌞 I enjoyed long walks along the shore and swimming in the ocean. 🏊‍♀️ The sunsets were breathtaking, and I loved watching the sky change colors. 🌅 The time away from the hustle and bustle was rejuvenating. 🌺 This beach getaway was the perfect escape and has left me feeling refreshed and ready to tackle new challenges. 🌟",
        "likes": 17,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e0e",
        "category": "Food 🍕",
        "description": "Tried making homemade pizza. It was a hit with everyone! 🍕",
        "content": "I decided to try making homemade pizza, and it was a great success. 🍕 The crust was crispy, and the toppings were delicious. 🧀 I experimented with different ingredients and created a unique recipe that everyone loved. 🌟 The process of making the pizza from scratch was fun and rewarding. 👨‍🍳 The pizza was a hit with family and friends, and it’s definitely a recipe I’ll be using again. 🍽️ Cooking this meal has inspired me to try more homemade dishes and experiment with different flavors. 👍",
        "likes": 12,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e0f",
        "category": "Fitness 🏊‍♂️",
        "description": "Started swimming regularly. Feeling more fit and healthy! 🏊",
        "content": "I’ve started incorporating swimming into my regular fitness routine, and I’m loving it. 🏊 The full-body workout is excellent for building endurance and strength. 💪 I feel more energized and healthier overall. 🌟 Swimming has also been a great way to relieve stress and improve my mood. 😊 I’m excited to continue with this new activity and see how it enhances my fitness journey. 🚀 The water workouts are refreshing and enjoyable, making them a great addition to my routine. 💧",
        "likes": 8,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e10",
        "category": "Education 📖",
        "description": "Read an insightful book on personal development. Highly recommended! 📚",
        "content": "I just finished reading a fantastic book on personal development, and it was truly inspiring. 📚 The book offered valuable insights and practical advice on improving various aspects of life. 🌟 The author’s perspective on goal-setting and self-growth was particularly enlightening. 🚀 I found the exercises and reflections included in the book to be very helpful. 💡 The reading experience was both enjoyable and thought-provoking. 🤔 I would highly recommend this book to anyone looking to enhance their personal development journey. 📖 It has motivated me to set new goals and pursue growth in different areas of my life. 🌱",
        "likes": 11,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e11",
        "category": "Technology 📚",
        "description": "Explored the latest advancements in AI. Fascinating stuff! 🤖",
        "content": "I recently delved into the latest advancements in artificial intelligence, and it’s been fascinating. 🤖 The developments in machine learning and neural networks are incredibly impressive. 🌟 I’ve been reading about how AI is being used in various fields, from healthcare to finance. 📈 The potential applications of AI are vast and exciting. 🚀 I’m eager to see how these advancements will continue to shape the future. 🌐 This exploration has deepened my understanding of AI and its impact on technology. 💡",
        "likes": 14,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e12",
        "category": "Music 🎧",
        "description": "Discovered a new favorite band. Their music is amazing! 🎶",
        "content": "I’ve recently discovered a new band, and their music is absolutely amazing. 🎶 Their unique sound and catchy tunes have quickly become some of my favorites. 🎸 I’m excited to explore more of their discography and see them perform live. 🌟 Their songs have been on repeat, and I can’t get enough of their music. 🎧 I’m thrilled to have found this new addition to my playlist. 🎵 The band’s creativity and talent are truly impressive. 🌈",
        "likes": 17,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e13",
        "category": "Travel 🏞️",
        "description": "Visited a beautiful national park. Nature at its finest! 🌲",
        "content": "My visit to the national park was an incredible experience. 🌲 The natural beauty of the park was breathtaking, with lush forests and serene lakes. 🌟 Hiking the trails and enjoying the peaceful surroundings was so refreshing. 🥾 The wildlife sightings and scenic viewpoints added to the adventure. 🦉 The fresh air and natural landscapes provided a much-needed escape from city life. 🌳 This trip has reinforced my appreciation for nature and the importance of preserving these beautiful places. 🌍",
        "likes": 19,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e14",
        "category": "Food 🍳",
        "description": "Cooked a hearty breakfast for the family. Everyone loved it! 🥓",
        "content": "I prepared a hearty breakfast for my family, and it was a big hit. 🥓 The spread included eggs, bacon, pancakes, and fresh fruit. 🍳🍑 Everyone enjoyed the delicious meal and appreciated the effort. 😋 Cooking for my loved ones is always a rewarding experience. 🌟 The breakfast was a great way to start the day, and it brought everyone together for a joyful meal. 🥰 This has inspired me to try more new recipes and cook for special occasions. 🍽️",
        "likes": 12,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e15",
        "category": "Fitness 🏅",
        "description": "Achieved a personal best in my weightlifting routine. Feeling strong! 💪",
        "content": "I recently achieved a personal best in my weightlifting routine, and it feels amazing. 💪 The hard work and dedication have paid off. 🏋️ The new weights were challenging but manageable, and I’m thrilled with the progress. 🌟 This accomplishment has motivated me to continue pushing my limits. 🚀 The improvements in strength and technique are encouraging. 💥 I’m excited to set new goals and see how far I can go in my fitness journey. 🏆",
        "likes": 8,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e16",
        "category": "Education 🎓",
        "description": "Started learning a new programming language. Exciting new challenge! 🖥️",
        "content": "I’ve embarked on the journey of learning a new programming language, and it’s been exciting. 🖥️ The new concepts and syntax are challenging but interesting. 🌟 I’m enjoying the process of building projects and solving problems with this language. 🛠️ The learning curve is steep, but the progress is rewarding. 🚀 I’m looking forward to mastering the language and applying it to real-world scenarios. 📈 This new challenge has sparked my curiosity and enthusiasm for coding. 💡",
        "likes": 11,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e17",
        "category": "Technology 🖥️",
        "description": "Built a custom PC for gaming. Performance is top-notch! 🎮",
        "content": "I’ve just built a custom PC for gaming, and the performance is incredible. 🎮 The new setup handles all the latest games with ease and provides smooth graphics. 🌟 The build process was a fun learning experience, and I’m proud of the final result. 🛠️ The upgraded components, including the graphics card and processor, have made a huge difference. 🚀 Gaming on this new PC is a whole new experience, and I’m thrilled with the performance. 🎉 This custom build has enhanced my gaming setup and exceeded my expectations. 💪",
        "likes": 18,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e18",
        "category": "Music 🎤",
        "description": "Recorded a cover of my favorite song. It turned out great! 🎙️",
        "content": "I recorded a cover of my favorite song, and I’m thrilled with how it turned out. 🎙️ The process of recording and mixing the track was both challenging and fun. 🎶 I’m proud of the final result and excited to share it with others. 🌟 Music has always been a passion of mine, and this cover is a great way to express that. 🎵 I’ve received positive feedback from friends and family, which is encouraging. 😊 This experience has motivated me to keep exploring music and recording more covers. 🎹",
        "likes": 15,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e19",
        "category": "Travel 🏜️",
        "description": "Explored a stunning desert landscape. A unique adventure! 🌵",
        "content": "My exploration of the desert landscape was a unique and memorable adventure. 🌵 The vastness of the desert and its natural beauty were truly captivating. 🏜️ I enjoyed the solitude and serenity of the environment. 🌟 The sand dunes and rock formations created a mesmerizing scenery. 🏜️ I also had the opportunity to learn about the local flora and fauna. 🌼 This desert journey has given me a new appreciation for diverse natural landscapes. 🌍",
        "likes": 13,
        "comments": []
    },
    {
        "author": "66b5d816f3fc75e5dd870e1a",
        "category": "Food 🥗",
        "description": "Made a fresh and healthy salad for lunch. Delicious and nutritious! 🥗",
        "content": "I prepared a fresh and healthy salad for lunch, and it was both delicious and nutritious. 🥗 The salad included a variety of fresh vegetables and a light vinaigrette dressing. 🌟 Eating this meal made me feel good about making healthy choices. 🥒 The combination of flavors and textures was satisfying and enjoyable. 🥕 I’m planning to incorporate more salads into my diet to maintain a balanced and healthy lifestyle. 🌱 This meal was a great reminder of how simple and tasty healthy food can be. 🍽️",
        "likes": 9,
        "comments": []
    }
];




async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/FaceGram', { useNewUrlParser: true, useUnifiedTopology: true });
        
        for (const postData of posts) {
            const post = new Post(postData);
            await post.save();

            await User.findByIdAndUpdate(
                postData.author, 
                { $push: { posts: post._id } }, 
                { new: true, useFindAndModify: false }
            );
        }

        console.log('Database seeded successfully');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();
