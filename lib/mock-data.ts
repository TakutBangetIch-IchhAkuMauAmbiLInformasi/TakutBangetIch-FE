export const mockPapers = [
  {
    id: "2503.08420",
    title: "Generalizable and Explainable Deep Learning for Medical Image Computing: An Overview",
    content:
      "Deep learning has revolutionized medical image computing, enabling unprecedented performance in various tasks such as classification, segmentation, and detection. However, two critical challenges remain: generalizability across different datasets and explainability of complex models. This paper provides a comprehensive overview of recent advances in generalizable and explainable deep learning methods for medical imaging. We categorize generalization approaches into data-centric and model-centric methods, and explainability techniques into post-hoc and intrinsic approaches. We discuss the trade-offs between model performance, generalizability, and explainability, and provide insights into future research directions for developing clinically applicable AI systems.",
    score: 4.59,
    metadata: {
      authors: "Ahmad Chaddad, Yan Hu, Yihang Wu, Binbin Wen, Reem Kateb",
      categories: "cs.CV cs.LG",
      doi: "10.1016/j.cobme.2024.100567",
      year: "2025",
      submitter: "Yihang Wu",
    },
    highlights: {
      abstract: [
        "Deep learning has revolutionized <em>medical image</em> computing, enabling unprecedented performance...",
      ],
      title: ["<em>Generalizable</em> and <em>Explainable</em> Deep Learning for Medical Image Computing"],
      passage: [
        "We categorize generalization approaches into data-centric methods (e.g., data augmentation, domain adaptation) and model-centric methods (e.g., transfer learning, meta-learning).",
        "For explainability, we distinguish between post-hoc methods that explain already trained models and intrinsic methods that incorporate interpretability into the model architecture.",
      ],
    },
  },
  {
    id: "2504.01121",
    title: "Transformer-based Architectures for Multimodal Fusion in Medical Imaging",
    content:
      "Multimodal medical imaging provides complementary information about anatomical structures and physiological processes, potentially improving diagnostic accuracy and treatment planning. However, effectively fusing information from different imaging modalities remains challenging. This paper explores transformer-based architectures for multimodal fusion in medical imaging, focusing on MRI-PET, CT-MRI, and histopathology-genomics combinations. We propose a novel cross-attention mechanism that dynamically weights information from different modalities based on their relevance to the task. Our approach demonstrates superior performance compared to traditional concatenation-based fusion methods across multiple medical imaging benchmarks, while maintaining computational efficiency.",
    score: 4.21,
    metadata: {
      authors: "Sarah Johnson, Michael Chen, Priya Patel, David Kim",
      categories: "cs.CV cs.AI",
      doi: "10.1109/TMI.2024.3345678",
      year: "2024",
      submitter: "Sarah Johnson",
    },
    highlights: {
      abstract: ["Multimodal medical imaging provides complementary information about anatomical structures..."],
      title: ["<em>Transformer</em>-based Architectures for <em>Multimodal Fusion</em> in Medical Imaging"],
      passage: [
        "Our cross-attention mechanism computes attention weights between features from different modalities, allowing the model to focus on the most informative regions across modalities.",
        "Experiments on the BraTS dataset show that our approach achieves a Dice score of 0.89 for tumor segmentation, outperforming the previous state-of-the-art by 3.2%.",
      ],
    },
  },
  {
    id: "2503.09876",
    title: "Self-Supervised Learning for Medical Image Analysis: A Comprehensive Survey",
    content:
      "Self-supervised learning (SSL) has emerged as a powerful paradigm for leveraging unlabeled data in medical image analysis, where annotated data is often scarce and expensive to obtain. This survey provides a comprehensive overview of SSL methods for medical imaging, categorizing them into contrastive, generative, and predictive approaches. We analyze the effectiveness of different SSL strategies across various medical imaging modalities (MRI, CT, X-ray, ultrasound, histopathology) and tasks (classification, segmentation, detection, registration). Additionally, we discuss domain-specific challenges in medical imaging SSL, such as class imbalance, multi-modal learning, and anatomical priors integration. Finally, we identify promising research directions and open challenges in this rapidly evolving field.",
    score: 3.95,
    metadata: {
      authors: "Elena Rodriguez, James Wilson, Sophia Lee, Robert Taylor",
      categories: "cs.CV cs.LG cs.AI",
      doi: "10.1016/j.media.2024.102789",
      year: "2024",
      submitter: "Elena Rodriguez",
    },
    highlights: {
      abstract: [
        "<em>Self-supervised learning</em> (SSL) has emerged as a powerful paradigm for leveraging unlabeled data...",
      ],
      title: ["<em>Self-Supervised Learning</em> for Medical Image Analysis: A Comprehensive Survey"],
      passage: [
        "Contrastive learning methods like MoCo and SimCLR have been adapted for medical imaging by incorporating domain-specific augmentations such as intensity transformations and elastic deformations.",
        "Masked image modeling approaches inspired by BERT have shown promising results in 3D medical imaging, where anatomical structures provide strong contextual cues for reconstruction tasks.",
      ],
    },
  },
  {
    id: "2505.12345",
    title: "Federated Learning for Privacy-Preserving Healthcare Analytics",
    content:
      "Healthcare data is sensitive and subject to strict privacy regulations, making centralized machine learning approaches challenging. Federated learning (FL) offers a promising solution by enabling model training across distributed datasets without sharing raw data. This paper presents a comprehensive framework for privacy-preserving healthcare analytics using FL. We address key challenges including statistical heterogeneity in medical data, communication efficiency in resource-constrained environments, and privacy guarantees through differential privacy and secure aggregation. Our approach is evaluated on electronic health records, medical imaging, and wearable sensor data, demonstrating comparable performance to centralized learning while preserving patient privacy. We also provide practical guidelines for implementing FL systems in healthcare institutions.",
    score: 3.82,
    metadata: {
      authors: "Thomas Wang, Lisa Chen, Kevin Zhang, Maria Garcia",
      categories: "cs.LG cs.CY",
      doi: "10.1145/3450965.3465532",
      year: "2025",
      submitter: "Thomas Wang",
    },
    highlights: {
      abstract: [
        "Healthcare data is sensitive and subject to strict privacy regulations, making centralized machine learning approaches challenging...",
      ],
      title: ["<em>Federated Learning</em> for <em>Privacy-Preserving</em> Healthcare Analytics"],
      passage: [
        "Our FedProx-based approach with adaptive proximal terms addresses the challenge of statistical heterogeneity in medical data across different institutions.",
        "By combining differential privacy with secure aggregation, we achieve an ε-differential privacy guarantee of 3.2 while maintaining model utility within 5% of the non-private baseline.",
      ],
    },
  },
  {
    id: "2502.54321",
    title: "Large Language Models for Clinical Decision Support: Opportunities and Limitations",
    content:
      "Large Language Models (LLMs) have demonstrated remarkable capabilities in understanding and generating human language, raising interest in their potential applications for clinical decision support. This paper critically examines the opportunities and limitations of LLMs in healthcare settings. We evaluate state-of-the-art models on clinical reasoning tasks, medical knowledge assessment, and electronic health record summarization. While LLMs show promising performance in certain areas, we identify significant challenges including hallucination of medical facts, difficulty with complex reasoning chains, and limited transparency. We propose a framework for responsible integration of LLMs into clinical workflows, emphasizing human-AI collaboration, continuous evaluation, and domain-specific fine-tuning. Our findings suggest that LLMs can serve as valuable assistants to healthcare providers but should not replace clinical judgment.",
    score: 4.15,
    metadata: {
      authors: "Jennifer Brown, Daniel Smith, Rachel Green, Alex Johnson",
      categories: "cs.CL cs.AI",
      doi: "10.1001/jama.2024.1234",
      year: "2024",
      submitter: "Jennifer Brown",
    },
    highlights: {
      abstract: [
        "<em>Large Language Models</em> (LLMs) have demonstrated remarkable capabilities in understanding and generating human language...",
      ],
      title: ["<em>Large Language Models</em> for Clinical Decision Support: Opportunities and Limitations"],
      passage: [
        "In our evaluation on the MedQA dataset, GPT-4 achieved an accuracy of 87.3% on medical board-style questions, approaching but not surpassing the performance of medical specialists (91.5%).",
        "We observed that LLMs frequently hallucinate medical facts, with an average of 3.2 factual errors per generated clinical summary, highlighting the need for robust verification mechanisms.",
      ],
    },
  },
  {
    id: "2504.67890",
    title: "Quantum Machine Learning for Drug Discovery: Current Status and Future Directions",
    content:
      "Quantum machine learning (QML) represents a convergence of quantum computing and machine learning that could potentially address computational challenges in drug discovery. This paper reviews the current status of QML applications in pharmaceutical research, focusing on molecular property prediction, protein structure analysis, and virtual screening. We discuss quantum algorithms such as variational quantum eigensolvers (VQE) and quantum approximate optimization algorithms (QAOA) that show promise for modeling molecular interactions. While current quantum hardware limitations prevent practical advantages over classical methods, we identify near-term opportunities where QML might offer computational speedups or improved accuracy. We also outline a roadmap for QML in drug discovery as quantum hardware continues to advance, highlighting the need for hybrid quantum-classical approaches and domain-specific quantum feature maps.",
    score: 3.67,
    metadata: {
      authors: "David Miller, Susan White, John Anderson, Emily Davis",
      categories: "cs.LG cs.ET",
      doi: "10.1038/s41598-024-56789-0",
      year: "2024",
      submitter: "David Miller",
    },
    highlights: {
      abstract: [
        "<em>Quantum machine learning</em> (QML) represents a convergence of quantum computing and machine learning...",
      ],
      title: ["<em>Quantum Machine Learning</em> for Drug Discovery: Current Status and Future Directions"],
      passage: [
        "Our implementation of a 20-qubit variational quantum circuit for molecular property prediction demonstrates a theoretical quadratic speedup for certain electronic structure calculations, though noise in current quantum hardware negates this advantage.",
        "Quantum kernel methods show particular promise for capturing complex molecular similarity measures that are computationally expensive to calculate classically.",
      ],
    },
  },
  {
    id: "2503.11111",
    title: "Robust Graph Neural Networks for Molecular Property Prediction",
    content:
      "Graph Neural Networks (GNNs) have become the method of choice for molecular property prediction tasks in drug discovery and materials science. However, standard GNNs are vulnerable to structural perturbations and struggle with out-of-distribution generalization. This paper introduces Robust-MolGNN, a framework that enhances the robustness of GNNs for molecular applications through adversarial training, uncertainty quantification, and molecular substructure attention. Our approach systematically generates realistic molecular perturbations that preserve chemical validity while challenging the model. Extensive experiments on benchmark datasets including QM9, MoleculeNet, and Open Catalyst demonstrate that Robust-MolGNN significantly improves generalization to novel molecular scaffolds and provides reliable uncertainty estimates that correlate with prediction errors. The proposed method maintains competitive performance on in-distribution data while substantially improving robustness to distribution shifts commonly encountered in real-world molecular discovery campaigns.",
    score: 4.32,
    metadata: {
      authors: "Wei Zhang, Laura Martinez, Carlos Rodriguez, Hiroshi Yamamoto",
      categories: "cs.LG cs.AI",
      doi: "10.1021/acs.jcim.3c01234",
      year: "2023",
      submitter: "Wei Zhang",
    },
    highlights: {
      abstract: [
        "<em>Graph Neural Networks</em> (GNNs) have become the method of choice for molecular property prediction tasks...",
      ],
      title: ["Robust <em>Graph Neural Networks</em> for Molecular Property Prediction"],
      passage: [
        "Our molecular substructure attention mechanism identifies and emphasizes chemically relevant subgraphs, improving interpretability and robustness to structural variations.",
        "Robust-MolGNN achieves a 27% reduction in prediction error on scaffold-split evaluations compared to standard GNNs, demonstrating improved generalization to novel molecular structures.",
      ],
    },
  },
  {
    id: "2505.22222",
    title: "Efficient Transformers for Long-Context Natural Language Processing",
    content:
      "Transformer models have revolutionized natural language processing, but their quadratic attention complexity limits their applicability to long documents, conversations, and code. This paper presents a systematic comparison of efficient transformer architectures designed to handle long contexts. We evaluate linear attention, sparse attention, recurrent memory, and hierarchical approaches on tasks requiring long-range understanding, including document summarization, question answering, and code completion. Our analysis reveals that different efficiency techniques excel in different scenarios: linear attention models perform well on tasks requiring fine-grained token interactions, while hierarchical models excel at capturing document-level structure. We also introduce LongFormer-Hybrid, a novel architecture combining local windowed attention with global tokens and hierarchical compression, achieving state-of-the-art performance while scaling to sequences of 100,000+ tokens. Comprehensive benchmarks on computational efficiency show that our approach reduces memory usage by 78% and increases processing speed by 3.5x compared to full attention transformers.",
    score: 4.45,
    metadata: {
      authors: "Andrew Thompson, Michelle Lee, Christopher Wilson, Sophia Chen",
      categories: "cs.CL cs.LG",
      doi: "10.18653/v1/2024.acl-long.123",
      year: "2024",
      submitter: "Andrew Thompson",
    },
    highlights: {
      abstract: [
        "<em>Transformer</em> models have revolutionized natural language processing, but their quadratic attention complexity limits their applicability...",
      ],
      title: ["Efficient <em>Transformers</em> for Long-Context Natural Language Processing"],
      passage: [
        "Our LongFormer-Hybrid architecture uses a combination of sliding window attention (window size k=512) for local context and global attention for special tokens, with a hierarchical compression mechanism that reduces sequence length by a factor of 4 at each layer.",
        "On the LongBench evaluation suite, our model achieves an average score of 68.7, outperforming previous efficient transformers while using only 16GB of GPU memory for processing 100K tokens.",
      ],
    },
  },
]
