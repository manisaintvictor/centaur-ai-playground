# Contributing to Centaur AI Playground

🚀 Thank you for your interest in contributing to the Centaur AI Playground! This project demonstrates cognitive modeling and human-AI collaboration based on research by Dr. Marcel Binz.

## 🎯 Project Goals

- **Educational**: Demonstrate how AI processes information through human-like memory systems
- **Research**: Advance understanding of cognitive modeling and memory architectures  
- **Open Source**: Build a community around human-AI collaborative intelligence
- **Accessible**: Make complex cognitive science concepts understandable through interactive visualization

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm 9+
- Modern web browser with ES2020+ support

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/centaur-ai-playground.git
cd centaur-ai-playground

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 How to Contribute

### 1. Memory System Enhancements
- **New Memory Types**: Implement additional cognitive memory systems
- **Processing Algorithms**: Improve memory formation and retrieval algorithms
- **Cross-Story Connections**: Enhance pattern recognition across narratives

### 2. Testing & Validation
- **Memory Tests**: Create new test scenarios for different memory types
- **Cognitive Benchmarks**: Implement standardized cognitive assessment tools
- **Performance Metrics**: Add measurement tools for memory system efficiency

### 3. User Interface Improvements
- **Visualization**: Enhance real-time memory processing displays
- **Accessibility**: Improve screen reader support and keyboard navigation
- **Mobile Experience**: Optimize for tablet and mobile devices

### 4. Research Integration
- **Academic Sources**: Add citations and references to relevant cognitive science research
- **Data Export**: Improve research data export formats and analysis tools
- **Collaboration Tools**: Enable sharing of memory models and test results

## 🔬 Code Guidelines

### Memory System Architecture
```typescript
// Follow this pattern for new memory types
interface NewMemoryType {
  id: string;
  timestamp: number;
  content: any;
  strength: number;
  associations: string[];
}

class NewMemoryProcessor {
  process(input: string): NewMemoryType {
    // Implementation
  }
}
```

### React Components
```typescript
// Use TypeScript interfaces for all props
interface ComponentProps {
  memoryState: MemoryState;
  onUpdate: (state: MemoryState) => void;
}

// Follow naming conventions
const MemoryComponentName: React.FC<ComponentProps> = ({ memoryState, onUpdate }) => {
  // Implementation
};
```

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow consistent color scheme (purple/blue for memory, green for success, etc.)
- Ensure proper contrast ratios for accessibility
- Use Lucide React icons consistently

## 🧪 Testing Requirements

### Memory System Tests
```typescript
describe('Memory System', () => {
  test('should process story and create memories', () => {
    const processor = new MemoryProcessor();
    const result = processor.processStory('test story');
    expect(result.memoryState.shortTerm).toBeDefined();
  });
});
```

### Component Tests
```typescript
describe('MemoryViewer', () => {
  test('should render memory state correctly', () => {
    render(<MemoryViewer memoryState={mockState} />);
    expect(screen.getByText('Short-Term Memory')).toBeInTheDocument();
  });
});
```

## 📊 Performance Standards

- **Memory Processing**: < 500ms for story analysis
- **UI Responsiveness**: < 100ms for user interactions  
- **Bundle Size**: Keep under 1MB for main chunk
- **Accessibility**: WCAG 2.1 AA compliance

## 🎨 Design Principles

1. **Cognitive Accuracy**: Memory models should reflect real cognitive science research
2. **Visual Clarity**: Complex processes should be easy to understand visually
3. **Interactive Learning**: Users should learn through hands-on exploration
4. **Research Validity**: Maintain scientific accuracy and proper attribution

## 📚 Research Resources

- [Original Centaur Paper](https://marcelbinz.github.io/imgs/Centaur__preprint_.pdf)
- [Marcel Binz GitHub](https://github.com/marcelbinz)
- [Cognitive Science Research](https://github.com/topics/cognitive-modeling)
- [Memory Models](https://github.com/topics/memory-models)

## 🤝 Pull Request Process

1. **Fork & Branch**: Create a feature branch from `main`
2. **Develop**: Make your changes following the guidelines above
3. **Test**: Ensure all tests pass and add new tests for new features
4. **Document**: Update README and inline documentation
5. **Submit**: Create a detailed pull request with:
   - Clear description of changes
   - Screenshots/videos for UI changes
   - Links to relevant research or issues
   - Testing instructions

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature  
- [ ] Memory system enhancement
- [ ] Documentation update
- [ ] Research integration

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Memory processing verified

## Research Validation
- [ ] Changes align with cognitive science research
- [ ] Proper attribution maintained
- [ ] Academic accuracy verified
```

## 🏆 Recognition

Contributors will be recognized in:
- GitHub contributors page
- README.md acknowledgments
- Research citations (for significant contributions)
- Conference presentations (with permission)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For general questions and research collaboration
- **Email**: For private research collaboration inquiries

---

**Thank you for helping advance human-AI collaborative intelligence! 🧠🤖**